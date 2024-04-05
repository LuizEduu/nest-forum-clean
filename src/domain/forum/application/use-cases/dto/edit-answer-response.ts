import { Either } from '@/core/either'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

export type EditAnswerUseCaseResponseDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>
