import mongoose, { Types } from 'mongoose';

const { Schema, model } = mongoose;

interface MongooseTypes {
    type: Types.ObjectId;
    required?: boolean;
    ref: string;
}

interface IChannel {
    id: Number;
    title: string;
    description: string;
    creator: MongooseTypes;
    members: Array<MongooseTypes>;
    messages: Array<MongooseTypes>;
    countMembers: Number;
}

const channelSchema = new Schema<IChannel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        creator: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        members: {
            type: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
        },
        messages: {
            type: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Message' }],
        },
        countMembers: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

export default model<IChannel>('Channel', channelSchema);
