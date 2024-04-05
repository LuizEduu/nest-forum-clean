import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

/**
 * @type {object}
 * @property {UniqueEntityID} recipientId - id de quem criou a notificação.
 * @property {string} title - titulo da notificação.
 * @property {string} content - conteúdo da notificação.
 * @property {Date} readAt - data de leitura da notificação.
 * @property {Date} createdAt - data de criação da notificação.
 * @type {UniqueEntityID} id - criar a pergunta com id especifíco.
 *
 * @returns {Notification}
 */
export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
): Notification {
  return Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )
}
