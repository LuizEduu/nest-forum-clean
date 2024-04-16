import { DeleteQuestionUseCaseRequestDTO } from './dto'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { DeleteQuestionUseCaseResponseDTO } from './dto/delete-question-response'
import { left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequestDTO): Promise<DeleteQuestionUseCaseResponseDTO> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return right(null)
  }
}
