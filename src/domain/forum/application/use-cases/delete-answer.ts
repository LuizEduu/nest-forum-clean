import { left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { DeleteAnswerUseCaseRequestDTO } from './dto/delete-answer-request'
import { DeleteAnswerUseCaseResponseDTO } from './dto/delete-answer-response'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequestDTO): Promise<DeleteAnswerUseCaseResponseDTO> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}
