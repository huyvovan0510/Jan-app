import {IMessage, User} from 'react-native-gifted-chat';

export interface RoomData {
  id: string;
  roomName: string;
  avatar: string;
  lastMessage: string;
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

export interface roomDataParams {
  avatar: string;
  id: string;
  lastMessage: string;
  roomName: string;
}
