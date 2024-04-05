import { right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  FetchQuestionAnswersRequestDTO,
  FetchQuestionAnswersResponseDTO,
} from './dto'

export class FetchQuestionAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersRequestDTO): Promise<FetchQuestionAnswersResponseDTO> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    )

    return right({
      answers,
    })
  }
}
