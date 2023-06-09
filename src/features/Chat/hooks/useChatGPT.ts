import {useEffect} from 'react';
import {IMessage} from 'react-native-gifted-chat';
import {useDispatch} from 'react-redux';
import {ChatSelectors, useShallowEqualSelector} from '../store/chat.selectors';
import {ChatAction} from '../store/chat.slices';
const userID = '-001';

const useChatGPT = (roomId: string) => {
  const conversations = useShallowEqualSelector(ChatSelectors.getConversations);
  const roomStatus = useShallowEqualSelector(ChatSelectors.getIsGenerating);
  const messages = conversations?.[roomId] || [];
  const isGenerating = roomStatus?.[roomId];
  const dispatch = useDispatch();

  const onSaveMessage = () => {
    if (messages[0]?.unRead) {
      const newMessage = [...messages];
      newMessage[0].unRead = false;
      dispatch(ChatAction.saveConversation({roomId, messages: newMessage}));
    }
  };

  const onSendMessage = async (message: IMessage[]) => {
    const previousContext = messages?.map((item: IMessage) => ({
      role: item?.user?._id === userID ? 'user' : 'assistant',
      content: item?.text,
    }));
    const dataMessage = [message[0], ...messages];
    dispatch(ChatAction.saveConversation({roomId, messages: dataMessage}));
    dispatch(ChatAction.updateRoomStatus({roomId, isGenerating: true}));
    dispatch(
      ChatAction.sendMessageToChatGPT({
        roomId,
        content: message[0].text,
        previousContext,
      }),
    );
  };

  return {
    onSendMessage,
    isGenerating,
    messages,
    onSaveMessage,
  };
};

export default useChatGPT;
