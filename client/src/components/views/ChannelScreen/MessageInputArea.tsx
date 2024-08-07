import { PaperPlaneIcon } from "@radix-ui/react-icons";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SetStateAction, useState } from "react";
import { useChannel } from "@/hooks/useChannel";
import { TMessageObject } from "@/config/interfaces";

interface MessagInputAreaProps {
  userId: string;
  channelId: string;
}

const MessageInputArea = ({ userId, channelId }: MessagInputAreaProps) => {
  const { channelActions } = useChannel(channelId);

  const [text, setText] = useState<string>("");

  const changeText = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const message : TMessageObject = {
      from: userId,
      to: channelId,
      content: text,
      timestamp: new Date().getTime().toString(),
    };

    channelActions.sendMessage(message);

    setText("");
  };
  
  return (
    <div className="flex space-x-2 m-2 ">
      <Textarea
        placeholder="No game, just chat..."
        value={text}
        onChange={changeText}
        className="h-20"
      />
      <Button variant="secondary" onClick={sendMessage} className="h-20">
        <span className="sr-only">Send</span>
        <PaperPlaneIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MessageInputArea;
