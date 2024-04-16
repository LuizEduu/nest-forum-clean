import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  AnserQuestionUseCaseRequestDTO,
  AnserQuestionUseCaseResponseDTO,
} from './dto'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { right } from '@/core/either'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnserQuestionUseCaseRequestDTO): Promise<AnserQuestionUseCaseResponseDTO> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const attachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      }),
    )

    const answerAttachmentsList = new AnswerAttachmentList(attachments)

    answer.attachments = answerAttachmentsList

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
