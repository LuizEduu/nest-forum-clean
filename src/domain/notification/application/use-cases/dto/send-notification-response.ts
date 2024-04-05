import { Either } from '@/core/either'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export type SendNotificationUseCaseResponseDTO = Either<
  null,
  {
    notification: Notification
  }
>
