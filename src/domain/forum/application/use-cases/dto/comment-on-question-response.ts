import { Either } from '@/core/either'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export type CommentOnQuestionUseCaseResponseDTO = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>
