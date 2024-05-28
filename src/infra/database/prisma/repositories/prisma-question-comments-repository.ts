import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'
import { PrismaService } from '../prisma.service'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismaQuestionCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'

@Injectable()
export class PrismaQuestionComments implements QuestionCommentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)

    await this.prismaService.comment.create({
      data,
    })
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
    })

    if (!questionComment) {
      return null
    }

    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = await this.prismaService.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        questionId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const questionComments = await this.prismaService.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        questionId,
      },
      include: {
        author: true,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map(PrismaQuestionCommentWithAuthorMapper.toDomain)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prismaService.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    })
  }
}
