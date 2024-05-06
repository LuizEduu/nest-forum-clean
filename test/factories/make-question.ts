import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaQuestionMapper } from '@/infra/database/prisma/mappers/prisma-question-mapper'

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

@Injectable()
export class QuestionFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data)

    await this.prismaService.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })

    return question
  }
}
