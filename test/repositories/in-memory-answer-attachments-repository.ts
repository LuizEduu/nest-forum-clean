import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachments: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.answerAttachments.filter(
      (attachment) => attachment.answerId.toString() === answerId,
    )
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const attachments = this.answerAttachments.filter(
      (attachment) => attachment.answerId.toString() !== answerId,
    )

    this.answerAttachments = attachments
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.answerAttachments.push(...attachments)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const AnswerAttachments = this.answerAttachments.filter(
      (attachment) => !attachments.some((qt) => qt.equals(attachment)),
    )

    this.answerAttachments = AnswerAttachments
  }
}
