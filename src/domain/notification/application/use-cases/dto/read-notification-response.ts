import { Either } from '@/core/either'
import { NotAllowedError } from '@/core//errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core//errors/resource-not-found-error'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export type ReadNotificationUseCaseResponseDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>
