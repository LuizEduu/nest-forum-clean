import { Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

export type DeleteAnswerUseCaseResponseDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
