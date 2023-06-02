import {useState} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import {createConversation} from '../services/chatGpt.service';
const userID = '-001';

const useChatGPT = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const onSendMessage = async (message: IMessage[]) => {
    const previousContext = messages?.map((item: IMessage) => ({
      role: item?.user?._id === userID ? 'user' : 'assistant',
      content: item?.text,
    }));
    setMessages(pre => [message[0], ...pre]);
    setIsGenerating(true);
    const dataMessage = await createConversation(
      message[0].text,
      previousContext,
    );

    const newMessage = {
      _id: `temp_${Date.now()}_${Math.random()}`,
      text: dataMessage?.message?.content,
      createdAt: 3412,
      user: {
        _id: 'assistant',
      },
    };
    setIsGenerating(false);
    setMessages(pre => [newMessage, ...pre]);
  };

  return {
    onSendMessage,
    isGenerating,
    messages,
  };
};

export default useChatGPT;
