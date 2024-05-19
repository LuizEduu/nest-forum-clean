import { FakeUploader } from 'test/upload/fake-uploader'
import { AttachmentsRepository } from '../repositories/attachmen ts-repository'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type'

let attachmentsRepository: AttachmentsRepository
let uploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('upload and create attachment', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    uploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentUseCase(attachmentsRepository, uploader)
  })

  it('shoud be able to upload and create attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    if (result.isRight()) {
      expect(result.value.attachment.id.toString()).toEqual(expect.any(String))
      expect(result.value.attachment.url).toEqual(expect.any(String))
      expect(uploader.uploads[0]).toEqual(
        expect.objectContaining({
          fileName: 'profile.png',
          url: expect.any(String),
        }),
      )
    }
  })

  it('should not be able to upload and create attachment with invalid type', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'audio/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
