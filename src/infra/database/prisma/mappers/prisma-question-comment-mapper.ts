import { Comment as PrismaComment, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment as QuestionCommentDomain } from '@/domain/forum/enterprise/entities/question-comments'

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionCommentDomain {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.')
    }

    return QuestionCommentDomain.create(
      {
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        questionId: new UniqueEntityID(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    questionComment: QuestionCommentDomain,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
      questionId: questionComment.questionId.toString(),
      content: questionComment.content,
      createdAt: questionComment.createdAt,
      updatedAt: questionComment.updatedAt,
    }
  }
}
