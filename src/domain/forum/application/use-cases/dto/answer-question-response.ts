import { Either } from '@/core/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export type AnserQuestionUseCaseResponseDTO = Either<
  null,
  {
    answer: Answer
  }
>
