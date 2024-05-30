import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: QuestionsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
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
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'nova questão',
      title: 'Nova questão title',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.question.authorId.toString()).toEqual('1')
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question.content).toEqual('nova questão')
      expect(result.value.question.title).toEqual('Nova questão title')
      expect(result.value.question.attachments.currentItems).toHaveLength(2)
      expect(result.value.question.attachments.currentItems).toEqual([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ])
    }
  })

  it('shoud persist attachments when creating a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'nova questão',
      title: 'Nova questão title',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(
      inMemoryQuestionAttachmentsRepository.questionAttachments,
    ).toHaveLength(2)
    expect(inMemoryQuestionAttachmentsRepository.questionAttachments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})
