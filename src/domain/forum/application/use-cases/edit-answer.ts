import { left, right } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { EditAnswerUseCaseRequestDTO } from './dto'
import { EditAnswerUseCaseResponseDTO } from './dto/edit-answer-response'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

export class EditAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequestDTO): Promise<EditAnswerUseCaseResponseDTO> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(
        answer.id.toString(),
      )

    const answerAttachmentsList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      }),
    )

    answerAttachmentsList.update(questionAttachments)

    answer.content = content
    answer.attachments = answerAttachmentsList

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
