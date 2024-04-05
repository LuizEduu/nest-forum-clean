import { Either } from '@/core/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

export type DeleteQuestionUseCaseResponseDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
