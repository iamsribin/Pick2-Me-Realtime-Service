import { INotificationSchema } from "@/entities/INotification";
import { Schema, model } from "mongoose";


const NotificationSchema = new Schema<INotificationSchema>(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        type: {
            type:String,
            enum:['system','ride','payment'],
            required: true,
        },
        date: {
            type: Date,
            required: false
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = model("Notification", NotificationSchema);
export default Notification;