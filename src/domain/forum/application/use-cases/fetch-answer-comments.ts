import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import {
  FetchAnswerCommentsUseCaseRequestDTO,
  FetchAnswerCommentsUseCaseResponseDTO,
} from './dto'
import { right } from '@/core/either'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequestDTO): Promise<FetchAnswerCommentsUseCaseResponseDTO> {
    const comments =
      await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(
        answerId,
        {
          page,
        },
      )

    return right({
      comments,
    })
  }
}
