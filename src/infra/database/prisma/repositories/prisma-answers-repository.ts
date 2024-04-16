import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  async findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {}

  async findById(id: string): Promise<Answer | null> {}

  async delete(answer: Answer): Promise<void> {}

  async create(answer: Answer): Promise<void> {}

  async save(answer: Answer): Promise<void> {}
}
