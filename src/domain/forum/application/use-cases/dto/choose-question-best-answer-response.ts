import { Either } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

export type ChooseQuestionBestAnswerUseCaseResponsetDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>
