import { Either } from '@/core/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export type FetchQuestionAnswersResponseDTO = Either<
  null,
  {
    answers: Answer[]
  }
>
