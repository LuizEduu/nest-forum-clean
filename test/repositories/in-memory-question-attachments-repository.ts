import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public questionAttachments: QuestionAttachment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    return this.questionAttachments.filter(
      (qa) => qa.questionId.toString() === questionId,
    )
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.questionAttachments.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.questionAttachments.filter(
      (attachment) => !attachments.some((qt) => qt.equals(attachment)),
    )

    this.questionAttachments = questionAttachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const attachments = this.questionAttachments.filter(
      (qa) => qa.questionId.toString() !== questionId,
    )

    this.questionAttachments = attachments
  }
}
