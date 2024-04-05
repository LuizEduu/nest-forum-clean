import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (n) => n.id.toString() === notification.id.toString(),
    )

    this.notifications[index] = notification
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((n) => n.id.toString() === id)

    return notification ?? null
  }
}
