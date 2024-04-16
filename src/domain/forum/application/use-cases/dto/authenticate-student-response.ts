import { Either } from '@/core/either'
import { WrongCredentialsError } from '../errors/wrong-credentials-error'

export type AuthenticateStudentUseCaseResponseDTO = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>
