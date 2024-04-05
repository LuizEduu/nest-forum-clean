import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

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
 * @returns {Question}
 */
export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
): Question {
  return Question.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...override,
    },
    id,
  )
}
