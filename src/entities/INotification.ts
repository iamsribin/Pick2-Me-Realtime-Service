import { Document, Schema } from "mongoose";

export interface INotificationSchema extends Document {
    senderId: Schema.Types.ObjectId;
    receiverId: Schema.Types.ObjectId;
    title: string,
    body:string,
    type: 'system'|'ride'|'payment';
    path: string;
    date: Date;
    createdAt: Date;
    isRead: boolean;
}