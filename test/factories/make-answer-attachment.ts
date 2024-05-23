import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

/**
 * @property {UniqueEntityID} attachmentId - id do attachment.
 * @property {UniqueEntityID} answerId - id da pergunta.
 * @returns {AnswerAttachment}
 */
export function makeAnswerAttachment(
  override: Partial<AnswerAttachment> = {},
  id?: UniqueEntityID,
): AnswerAttachment {
  return AnswerAttachment.create(
    {
      attachmentId: override.attachmentId ?? new UniqueEntityID(),
      answerId: override.answerId ?? new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: {
        answerId: answerAttachment.answerId.toString(),
      },
    })

    return answerAttachment
  }
}
