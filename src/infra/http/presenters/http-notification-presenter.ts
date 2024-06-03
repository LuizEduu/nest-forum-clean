import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class HttpNotificationPresenter {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id.toString(),
      content: notification.content,
      title: notification.title,
      readAt: notification.readAt ? notification.readAt : null,
      userId: notification.recipientId.toString(),
    }
  }
}
