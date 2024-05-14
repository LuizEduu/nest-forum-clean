import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comments'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaQuestionCommentMapper } from '@/infra/database/prisma/mappers/prisma-question-comment-mapper'
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

@Injectable()
export class QuestionCommentFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaQuestionComment(data: Partial<QuestionCommentProps> = {}) {
    const questionComment = makeQuestionComment(data)

    await this.prismaService.comment.create({
      data: PrismaQuestionCommentMapper.toPrisma(questionComment),
    })

    return questionComment
  }
}
