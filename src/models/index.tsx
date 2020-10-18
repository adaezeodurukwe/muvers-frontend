export interface Ticket {
  plan: string;
  status: string;
  time: Date;
  note: string;
  user: User;
}

interface User {
  firstName: string;
  email: string;
}

export interface Connection {
  adminId: number;
  chat: Chat[];
  createdAt: Date;
  id: number;
  updatedAt: Date;
  user: User;
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Chat {
  connectionId: number;
  createdAt: Date;
  id: number;
  message: string;
  parentId: number;
  senderName: string;
  updatedAt: Date;
  userId: number;
}

export interface ChatReturnData {
  newChat: Chat;
  connection: Connection;
}
