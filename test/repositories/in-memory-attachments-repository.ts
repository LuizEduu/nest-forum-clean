import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachmen ts-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  private attachments: Attachment[] = []

  async create(attachment: Attachment): Promise<void> {
    this.attachments.push(attachment)
  }
}
