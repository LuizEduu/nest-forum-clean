import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { FetchQuestionCommentsUseCaseRequestDTO } from './dto/fetch-question-comments-request'
import { FetchQuestionCommentsUseCaseResponseDTO } from './dto/fetch-question-comments-response'
import { right } from '@/core/either'

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequestDTO): Promise<FetchQuestionCommentsUseCaseResponseDTO> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
