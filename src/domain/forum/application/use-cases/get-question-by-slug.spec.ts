import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import GetQuestionBySlugUseCase from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: QuestionAttachmentsRepository
let inMemoryQuestionsRepository: QuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to a question', async () => {
    const createdQuestion = makeQuestion({
      slug: Slug.create('javascript-question-with-arrays'),
    })

    await inMemoryQuestionsRepository.create(createdQuestion)

    const result = await sut.execute({
      slug: 'javascript-question-with-arrays',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.question.authorId).toBeTruthy()
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question.content).toEqual(createdQuestion.content)
      expect(result.value.question.title).toEqual(createdQuestion.title)
      expect(result.value.question.slug.value).toEqual(
        createdQuestion.slug.value,
      )
    }
  })

  it('shoud be able to throws error with question not found', async () => {
    const result = await sut.execute({
      slug: 'question-not-exists',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
