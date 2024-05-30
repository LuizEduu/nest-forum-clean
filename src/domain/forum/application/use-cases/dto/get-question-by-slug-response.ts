import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'

export type GetQuestionBySlugUseCaseResponseDTO = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails
  }
>
