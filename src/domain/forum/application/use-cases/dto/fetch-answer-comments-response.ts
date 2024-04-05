import { Either } from '@/core/either'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments'

export type FetchAnswerCommentsUseCaseResponseDTO = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>
