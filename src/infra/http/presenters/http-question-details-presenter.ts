import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { HttpAttachmentPresenter } from './http-attachment-presenter'

export class HttpQuestionDetailsPresenter {
  static toHTTP(question: QuestionDetails) {
    return {
      id: question.questionId.toString(),
      authorId: question.authorId.toString(),
      authorName: question.author,
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      attachments: question.attachments.map(HttpAttachmentPresenter.toHTTP),
      bestAnswerId: question.bestAnswerId?.toString(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
