import { INotificationDto } from "@/dto/INotification.DTO";
import { INotificationSchema } from "../../entities/INotification";

export interface INotificationService {
    // getNotifications(receiverId: string, limit: number, skip: number): Promise<INotificationDto[]>;
    createNotification(notification: Partial<INotificationSchema>): Promise<INotificationDto>;
    updateNotification(notificationId: string): Promise<void>;
    updateAllNotifications(receiverId: string): Promise<void>;
    deleteNotification(notificationId: string): Promise<void>;
}