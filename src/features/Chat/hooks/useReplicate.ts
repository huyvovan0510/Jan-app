import {IMessage} from 'react-native-gifted-chat';
import {useDispatch} from 'react-redux';
import {ChatSelectors, useShallowEqualSelector} from '../store/chat.selectors';
import {ChatAction} from '../store/chat.slices';
const INTERVAL_TIME = 1000;
const useReplicate = (roomId: string) => {
  const conversations = useShallowEqualSelector(ChatSelectors.getConversations);
  const messages = conversations?.[roomId] || [];

  const roomStatus = useShallowEqualSelector(ChatSelectors.getIsGenerating);
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
    const dataMessage = [message[0], ...messages];
    dispatch(ChatAction.saveConversation({roomId, messages: dataMessage}));
    dispatch(ChatAction.updateRoomStatus({roomId, isGenerating: true}));
    dispatch(
      ChatAction.replicateGenerationImage({
        roomId,
        prompt: message?.[0].text,
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

export default useReplicate;
