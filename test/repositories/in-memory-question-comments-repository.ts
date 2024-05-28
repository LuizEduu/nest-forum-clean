import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  private questionComments: QuestionComment[] = []

  constructor(
    private readonly studentsRepository: InMemoryStudentsRepository,
  ) {}

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.questionComments.find(
      (questionComment) => questionComment.id.toString() === id,
    )

    return questionComment ?? null
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.questionComments.findIndex(
      (qc) => qc.id.toString() === questionComment.id.toString(),
    )
    this.questionComments.splice(index, 1)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionComments
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    return this.questionComments
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.students.find((student) =>
          student.id.equals(comment.authorId),
        )

        if (!author) {
          throw new Error(
            `Author with id "${comment.authorId.toString()}" does not exists`,
          )
        }

        return CommentWithAuthor.create({
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          commentId: comment.id,
          author: author.name,
        })
      })
  }
}
