import { Either } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'

export type FetchRecentQuestionsUseCaseResponseDTO = Either<
  null,
  {
    questions: Question[]
  }
>
