import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attachment as AttachmentDomain } from '@/domain/forum/enterprise/entities/attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toPrisma(
    attachment: AttachmentDomain,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }

  static toDomain(raw: PrismaAttachment): AttachmentDomain {
    return AttachmentDomain.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
