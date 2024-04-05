import { Either } from '@/core/either'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'

export type FetchQuestionCommentsUseCaseResponseDTO = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>
