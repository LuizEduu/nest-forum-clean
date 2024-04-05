import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let inMemoryNotificationsRepository: NotificationsRepository
let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value?.notification).toEqual(
        expect.objectContaining({
          recipientId: notification.recipientId,
          content: notification.content,
          title: notification.title,
          readAt: result.value.notification.readAt,
        }),
      )
    }
  })

  it('shoud not be able to read a notification when not found', async () => {
    const result = await sut.execute({
      recipientId: '1',
      notificationId: 'id not found',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to read a notification when recipientId is not equals', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: 'diff recipient id',
      notificationId: notification.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
