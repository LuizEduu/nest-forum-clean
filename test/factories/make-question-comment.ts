import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comments'

/**
 * @property {UniqueEntityID} authorId - id do autor da pergunta.
 * @property {string} content - comentário na resposta.
 * @property {UniqueEntityID} questionId - id da pergunta.
 * @property {Date} createdAt - data de criação.
 * @property {Date} updatedAt - data de atualização da pergunta.
 *
 * @type {UniqueEntityID} id - criar a pergunta com id especifíco.
 *
 * @returns {QuestionComment}
 */
export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
): QuestionComment {
  return QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
