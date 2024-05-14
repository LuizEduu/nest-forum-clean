import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comments'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment-mapper'
import { Injectable } from '@nestjs/common'

/**
 * @property {UniqueEntityID} authorId - id do autor da pergunta.
 * @property {string} content - comentário na resposta.
 * @property {UniqueEntityID} questionId - id da pergunta.
 * @property {Date} createdAt - data de criação.
 * @property {Date} updatedAt - data de atualização da pergunta.
 *
 * @type {UniqueEntityID} id - criar a pergunta com id especifíco.
 *
 * @returns {AnswerComment}
 */
export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
): AnswerComment {
  return AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      answerId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaAnswerComment(data: Partial<AnswerCommentProps> = {}) {
    const answerComment = makeAnswerComment(data)

    await this.prismaService.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })

    return answerComment
  }
}
