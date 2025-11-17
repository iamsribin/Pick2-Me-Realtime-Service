import { INotificationDto } from "@/dto/INotification.DTO";
import { INotificationSchema } from "@/entities/INotification";
import { INotificationRepository } from "@/repository/interfaces/i-notification-repo";
import { emitToUser } from "@/utils/socket-emit";
import { BadRequestError } from "@Pick2Me/shared/errors";
import { INotificationService } from "../interfaces/i-notification-service";


export class NotificationService implements INotificationService {
    private notificationRepository: INotificationRepository;

    constructor(notificationRepository: INotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // async getNotifications(
    //     receiverId: string,
    //     limit: number,
    //     skip: number
    // ): Promise<INotificationDto[]> {
    //     try {
    //         const notifications = await this.notificationRepository.getNotifications(
    //             receiverId as string,
    //             limit,
    //             skip
    //         );

    //         if (!notifications || notifications.length === 0) {
    //             return [];
    //         }

    //         let userIds: string[] = []; 

    //         for (let i = 0; i < notifications.length; i++) {
    //             userIds.push(notifications[i].senderId as unknown as string);
    //         }


    //         // Map data to return type
    //         const notificationsDto: INotificationDto[] = {

    //         }

    //         return notificationsDto;
    //     } catch (err: unknown) {
    //         throw err;
    //     }
    // }

    async createNotification(
        notification: Partial<INotificationSchema>
    ): Promise<INotificationDto> {
        try {
            const newNotification = await this.notificationRepository.create(
                notification
            );

            if (!newNotification)
                throw BadRequestError("An unexpected error occurred!");

            const notificationDto: INotificationDto = {
                id: newNotification._id as unknown as string,
                senderId: newNotification.senderId as unknown as string,
                receiverId: newNotification.receiverId as unknown as string,
                body: newNotification.body,
                type: newNotification.type,
                title: newNotification.title,
                date: newNotification.date.toISOString(),
            };

            return notificationDto;
        } catch (err: unknown) {
            throw err;
        }
    }

    async updateNotification(notificationId: string): Promise<void> {
        try {
            const updatedNotification = await this.notificationRepository.update(
                  notificationId,
                { $set: { isRead: true } }
            );

            if (!updatedNotification)
                throw BadRequestError("Failed to mark notification as read!");
        } catch (err: unknown) {
            throw err;
        }
    }

    async updateAllNotifications(receiverId: string): Promise<void> {
        try {
            const result = await this.notificationRepository.updateAllNotifications(
                receiverId
            );

            if (!result) throw new Error("Failed to mark notifications as read!");
        } catch (err: unknown) {
            throw err;
        }
    }

    async deleteNotification(notificationId: string): Promise<void> {
        try {
            const result = await this.notificationRepository.delete(notificationId);

            if (!result) throw BadRequestError("Failed to delete notification!");
        } catch (err: unknown) {
            throw err;
        }
    }
}