import {createActions, createReducer} from 'reduxsauce';
import {IChatReducer} from '../chat.interface';

const {Types: ChatTypes, Creators: ChatAction} = createActions({
  saveConversation: ['payload'],
  replicateGenerationImage: ['payload'],
  sendMessageToChatGPT: ['payload'],
  updateRoomStatus: ['payload'],
  updateLastMessageId: ['payload'],
});

const INITIAL_STATE: IChatReducer = {
  listRoomChat: [],
  conversations: undefined,
  roomStatus: undefined,
  lastMessageId: undefined,
};

const saveConversation = (state: any, {payload}: any) => {
  const {roomId, messages} = payload;
  return {
    ...state,
    conversations: {...state.conversations, [roomId]: messages},
  };
};

const updateRoomStatus = (state: any, {payload}: any) => {
  const {roomId, isGenerating} = payload;
  return {
    ...state,
    roomStatus: {...state.roomStatus, [roomId]: isGenerating},
  };
};
const updateLastMessageId = (state: any, {payload}: any) => {
  const {roomId, lastMessageId} = payload;
  return {
    ...state,
    lastMessageId: {...state.lastMessageId, [roomId]: lastMessageId},
  };
};

const ChatReducer = createReducer(INITIAL_STATE, {
  [ChatTypes.SAVE_CONVERSATION]: saveConversation,
  [ChatTypes.UPDATE_ROOM_STATUS]: updateRoomStatus,
  [ChatTypes.UPDATE_LAST_MESSAGE_ID]: updateLastMessageId,
});

export {ChatAction, ChatReducer, ChatTypes};
