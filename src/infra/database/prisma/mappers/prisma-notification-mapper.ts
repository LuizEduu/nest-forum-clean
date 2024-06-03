import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification as DomainNotification } from '@/domain/notification/enterprise/entities/notification'
import { Prisma, Notification as PrismaNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma(
    notification: DomainNotification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      content: notification.content,
      recipientId: notification.recipientId.toString(),
      title: notification.title,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    }
  }

  static toDomain(raw: PrismaNotification): DomainNotification {
    return DomainNotification.create(
      {
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId),
        title: raw.title,
        createdAt: raw.createdAt,
        readAt: raw.readAt ? new Date(raw.readAt) : null,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
