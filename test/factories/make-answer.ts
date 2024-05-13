import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prisma-answer-mapper'

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

@Injectable()
export class AnswerFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}) {
    const answer = makeAnswer(data)

    await this.prismaService.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}
