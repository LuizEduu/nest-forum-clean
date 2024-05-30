/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeQuestion } from 'test/factories/make-question'
import { MockInstance } from 'vitest'
import {
  SendNotificationUseCaseRequestDTO,
  SendNotificationUseCaseResponseDTO,
} from '../use-cases/dto'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryAnswerAttachmentsRepository: AnswerAttachmentsRepository
let inMemoryAnswersRepository: AnswersRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: QuestionsRepository
let inMemoryNotificationsRepository: NotificationsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationUseCaseExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequestDTO],
  Promise<SendNotificationUseCaseResponseDTO>
>

let onAnswerCreated: OnAnswerCreated

describe('on answer created', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationUseCaseExecuteSpy = vi.spyOn(
      sendNotificationUseCase,
      'execute',
    )

    onAnswerCreated = new OnAnswerCreated(
      inMemoryQuestionsRepository,
      sendNotificationUseCase,
    )
  })
  it('shoud send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationUseCaseExecuteSpy).toHaveBeenCalled()
    })
  })
})
