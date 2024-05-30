import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: QuestionsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions Use Case', () => {
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
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 27),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 28),
      }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 29),
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(result.value?.questions).toHaveLength(3)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 29) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 28) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 27) }),
    ])
  })

  it('shoud be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() && expect(result.value.questions).toHaveLength(2)
  })
})
