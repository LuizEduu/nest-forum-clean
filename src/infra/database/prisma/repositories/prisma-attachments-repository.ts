import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachmen ts-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaService } from '../prisma.service'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    console.log(data)

    await this.prismaService.attachment.create({
      data,
    })
  }
}
