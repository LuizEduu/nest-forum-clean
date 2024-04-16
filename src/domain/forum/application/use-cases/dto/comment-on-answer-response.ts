import { Either } from '@/core/either'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comments'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

export type CommentOnAnswerUseCaseResponseDTO = Either<
  ResourceNotFoundError,
  { answerComment: AnswerComment }
>
