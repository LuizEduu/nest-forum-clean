import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import {
  FetchAnswerCommentsUseCaseRequestDTO,
  FetchAnswerCommentsUseCaseResponseDTO,
} from './dto'
import { right } from '@/core/either'

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequestDTO): Promise<FetchAnswerCommentsUseCaseResponseDTO> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
