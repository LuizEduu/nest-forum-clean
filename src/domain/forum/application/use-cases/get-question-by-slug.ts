import { left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import {
  GetQuestionBySlugUseCaseRequestDTO,
  GetQuestionBySlugUseCaseResponseDTO,
} from './dto'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'

@Injectable()
export default class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequestDTO): Promise<GetQuestionBySlugUseCaseResponseDTO> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({
      question,
    })
  }
}
