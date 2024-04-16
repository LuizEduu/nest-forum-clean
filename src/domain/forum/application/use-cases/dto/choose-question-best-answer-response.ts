import { Either } from '@/core/either'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

export type ChooseQuestionBestAnswerUseCaseResponsetDTO = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>
