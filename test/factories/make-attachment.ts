import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Attachment,
  AttachmentProps,
} from '@/domain/forum/enterprise/entities/attachment'
import { faker } from '@faker-js/faker'

/**
 * @property {string} title - titulo do arquivo.
 * @property {string} url - url do arquivo.
 * @returns {Attachment}
 */
export function makeAttachment(
  override: Partial<AttachmentProps> = {},
  id?: UniqueEntityID,
): Attachment {
  return Attachment.create(
    {
      title: faker.lorem.text(),
      url: faker.internet.url(),
      ...override,
    },
    id,
  )
}
