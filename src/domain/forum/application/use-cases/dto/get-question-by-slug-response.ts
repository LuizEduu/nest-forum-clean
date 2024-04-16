import { Either } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export type GetQuestionBySlugUseCaseResponseDTO = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>
