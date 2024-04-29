import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment as AnswerCommentDomain } from '@/domain/forum/enterprise/entities/answer-comments'
import { Prisma, Comment as PrismaComment } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerCommentDomain {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerCommentDomain.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        answerId: new UniqueEntityID(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    answerComment: AnswerCommentDomain,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answerComment.id.toString(),
      answerId: answerComment.answerId.toString(),
      authorId: answerComment.authorId.toString(),
      content: answerComment.content,
      createdAt: answerComment.createdAt,
      updatedAt: answerComment.updatedAt,
    }
  }
}
