import {IMessage, User} from 'react-native-gifted-chat';

export interface RoomData {
  id: string;
  roomName: string;
  avatar: string;
  lastMessage: string;
  lastMessageId?: string;
}

export interface ChatUser extends User {
  role?: string;
  _id: string;
}

export interface ChatMessage extends IMessage {
  type: string;
  user: ChatUser;
  status?: string;
  createdAt: any;
  finishedReason?: string;
}

export interface ChatGPTMessage {
  role: string;
  content: string;
}

export interface Conversations {
  id: IMessage[];
}

export interface StatusRoom {
  lastMessage: string;
  isGenerating: boolean;
}

export interface IChatReducer {
  listRoomChat: RoomData[];
  conversations?: Conversations;
  roomStatus?: {
    id: StatusRoom;
  };
  lastMessageId?: {
    id: string;
  };
}

export interface ReplicateAiResult {
  status: string;
  url: string;
}
