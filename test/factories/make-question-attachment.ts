import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

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
