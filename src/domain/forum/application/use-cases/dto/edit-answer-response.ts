import { Either } from '@/core/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

export type EditAnswerUseCaseResponseDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>
