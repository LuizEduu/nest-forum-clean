import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

type PrismaCommentWithAuthor = PrismaComment & {
  author: PrismaUser
}

export class PrismaQuestionCommentWithAuthorMapper {
  static toDomain(raw: PrismaCommentWithAuthor): CommentWithAuthor {
    if (!raw.questionId) {
      throw new Error('Invalid comment type.')
    }

    return CommentWithAuthor.create({
      content: raw.content,
      authorId: new UniqueEntityID(raw.authorId),
      commentId: new UniqueEntityID(raw.id),
      author: raw.author.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
