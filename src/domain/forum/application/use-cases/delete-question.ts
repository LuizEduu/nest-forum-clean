import { DeleteQuestionUseCaseRequestDTO } from './dto'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeleteQuestionUseCaseResponseDTO } from './dto/delete-question-response'
import { left, right } from '@/core/either'
import { NotAllowedError } from './errors/not-allowed-error'

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
