import { Either } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'

export type CreateQuestionUseCaseResponseDTO = Either<
  null,
  {
    question: Question
  }
>
