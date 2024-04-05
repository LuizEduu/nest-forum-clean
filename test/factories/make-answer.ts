import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

/**
 * @type {object}
 * @property {UniqueEntityID} authorId - id do autor da pergunta.
 * @property {UniqueEntityID} bestAnswerId - id da melhor resposta.
 * @property {string} title - titulo da pergunta.
 * @property {string} content - Conteúdo da pergunta.
 * @property {Slug} slug - slug da pergunta.
 * @property {Date} createdAt - data de criação.
 * @property {Date} updatedAt - data de atualização da pergunta.
 *
 * @type {UniqueEntityID} id - criar a pergunta com id especifíco.
 *
 * @returns {Answer}
 */
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
): Answer {
  return Answer.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
