import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionComments implements QuestionCommentsRepository {
  async create(questionComment: QuestionComment): Promise<void> {}

  async delete(questionComment: QuestionComment): Promise<void> {}

  async findById(id: string): Promise<QuestionComment | null> {}

  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {}
}
