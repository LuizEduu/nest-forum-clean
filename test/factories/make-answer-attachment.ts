import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

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
