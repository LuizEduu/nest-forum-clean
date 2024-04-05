import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: QuestionAttachmentsRepository
let inMemoryQuestionsRepository: QuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
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
})
