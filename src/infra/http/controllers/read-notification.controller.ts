import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt-strategy'
import { BadRequestException, Controller, Param, Patch } from '@nestjs/common'
import { HttpNotificationPresenter } from '../presenters/http-notification-presenter'

@Controller('notifications/:notificationId/read')
export class ReadNotificationController {
  constructor(private readonly readNotification: ReadNotificationUseCase) {}

  @Patch()
  async handle(
    @CurrentUser() user: TokenPayload,
    @Param('notificationId') notificationId: string,
  ) {
    const userId = user.sub

    const result = await this.readNotification.execute({
      notificationId,
      recipientId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      notification: HttpNotificationPresenter.toHTTP(result.value.notification),
    }
  }
}
