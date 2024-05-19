import { left, right } from '@/core/either'
import { AttachmentsRepository } from '../repositories/attachmen ts-repository'
import {
  UploadAndAttachmentUseCaseRequest,
  UploadAndAttachmentUseCaseResponse,
} from './dto'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'
import { Attachment } from '../../enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { Uploader } from '../storage/uploader'

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private readonly attachmentsRepository: AttachmentsRepository,
    private readonly uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndAttachmentUseCaseRequest): Promise<UploadAndAttachmentUseCaseResponse> {
    if (!/^image\/(jpeg|jpg|png)$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
