import { Either } from '@/core/either'
import { InvalidAttachmentTypeError } from '../errors/invalid-attachment-type'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export type UploadAndAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment
  }
>
