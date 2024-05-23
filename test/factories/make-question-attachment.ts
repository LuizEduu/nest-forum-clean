import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

/**
 * @property {UniqueEntityID} attachmentId - id do attachment.
 * @property {UniqueEntityID} questionId - id da pergunta.
 * @returns {QuestionAttachment}
 */
export function makeQuestionAttachment(
  override: Partial<QuestionAttachment> = {},
  id?: UniqueEntityID,
): QuestionAttachment {
  return QuestionAttachment.create(
    {
      attachmentId: override.attachmentId ?? new UniqueEntityID(),
      questionId: override.questionId ?? new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaQuestionAttachmentFactory(
    data: Partial<QuestionAttachmentProps> = {},
  ) {
    const questionAttachment = makeQuestionAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: {
        questionId: questionAttachment.questionId.toString(),
      },
    })

    return questionAttachment
  }
}
