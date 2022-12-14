import { model, Schema } from 'mongoose';
import { ChatSchema } from '../interfaces/ChatInterface';



const messageSchema: Schema = new Schema({
  roomId: {
    type: String,
    required: true,
    default: () => Date.now().toString(),
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const chatSchema: Schema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
    default: () => Date.now().toString(),
  },
  messages: {
    type: [messageSchema],
    required: false,
  },
});

const chatModel = model<ChatSchema>('Chat', chatSchema);

export default chatModel;
