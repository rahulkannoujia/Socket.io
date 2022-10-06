import { Document } from 'mongoose';
import { MessageSchema } from './MessageInterface';

export interface ChatSchema extends Document {
  roomName: string;
  createdBy: string;
  roomId: string;
  messages: MessageSchema[];
}
