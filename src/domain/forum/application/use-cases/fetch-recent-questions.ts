import { right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { FetchRecentQuestionsUseCaseResponseDTO } from './dto'
import { FetchRecentQuetionsUseCaseRequestDTO } from './dto/fetch-recent-questions-request'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuetionsUseCaseRequestDTO): Promise<FetchRecentQuestionsUseCaseResponseDTO> {
    const questions = await this.questionsRepository.findManyRecent({
      page,
    })

    return right({
      questions,
    })
  }
}
