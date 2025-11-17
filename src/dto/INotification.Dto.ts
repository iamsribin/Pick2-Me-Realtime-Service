export interface INotificationDto {
  id: string;
  senderId: string;
  receiverId: string;
  title: string;
  body: string;
  type: 'system' | 'ride' | 'payment';
  date: string;
  read?: boolean;
}
