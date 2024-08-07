import channelModel from '../../mongo/models/channel.model';
import userModel from '../../mongo/models/user.model';
import { TChannel, TUser } from '../../server/socket/interfaces';
import { v4 } from 'uuid';

export default {
    async getAllChannels() {
        const channels = await channelModel
            .find({}, '-_id id title description countMembers')
            .populate({
                path: 'creator',
                select: '-_id uid name',
              })
            .populate({
                path: 'messages',
                select: '-_id id content channel createdAt',
                populate: [
                  { 
                    path: 'from',
                    select: '-_id uid name',
                  },
                  { 
                    path: 'to',
                    select: '-_id id title description',
                  }
                ]
              })
            .populate({
                path: 'members',
                select: '-_id uid name',
              });

        return channels;
    },
    async createChannel(channel: TChannel) {

      const userId = (channel.creator as TUser) ? 
        (<TUser>channel.creator).uid : (<string>channel.creator)
      
      let user = await userModel.findOne({ uid: userId })

      const doc = new channelModel({
          id: channel.id ? channel.id : v4(),
          title: channel.title,
          description: channel?.description ? channel.description : "",
          creator: user?._id,
          members: channel?.members,
          messages: channel?.messages,
          countMembers: channel?.countMembers,
      });

      const newChannel = await doc.save();

      return newChannel;
    },
    async removeChannel(channelId : string) {
      await channelModel
            .findOneAndDelete({ id: channelId });
    },
    async createUser(user : TUser) {
      const doc = new userModel({
        uid: user.uid,
        username: user.username,
        online: true,
      });

      const newUser = await doc.save();

      return newUser;
    },
    async getUser(userId : string) {
      return await userModel.findOne({ uid: userId }, '-_id uid username online');
    },
    async getAllUsers() {
      return await userModel.find({}, '-_id uid username online').sort({ online: -1 });
    },
};
