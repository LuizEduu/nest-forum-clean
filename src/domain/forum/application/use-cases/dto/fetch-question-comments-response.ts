import { Either } from '@/core/either'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export type FetchQuestionCommentsUseCaseResponseDTO = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>
