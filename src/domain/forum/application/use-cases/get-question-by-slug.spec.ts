import { QuestionsRepository } from '../repositories/questions-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import GetQuestionBySlugUseCase from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { makeStudent } from 'test/factories/make-student'
import { makeAttachment } from 'test/factories/make-attachment'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: QuestionsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question by slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find a question by slug', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    await inMemoryStudentsRepository.create(student)

    const createdQuestion = makeQuestion({
      slug: Slug.create('javascript-question-with-arrays'),
      authorId: student.id,
    })

    const attachment = makeAttachment()

    await inMemoryAttachmentsRepository.create(attachment)

    const questionAttachment = makeQuestionAttachment({
      attachmentId: attachment.id,
      questionId: createdQuestion.id,
    })

    createdQuestion.attachments = new QuestionAttachmentList([
      questionAttachment,
    ])

    await inMemoryQuestionsRepository.create(createdQuestion)

    const result = await sut.execute({
      slug: 'javascript-question-with-arrays',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.question.authorId).toBeTruthy()
      expect(result.value.question.questionId).toBeTruthy()
      expect(result.value.question.content).toEqual(createdQuestion.content)
      expect(result.value.question.title).toEqual(createdQuestion.title)
      expect(result.value.question.slug.value).toEqual(
        createdQuestion.slug.value,
      )
      expect(result.value.question.author).toEqual('John Doe')
      expect(result.value.question.authorId).toEqual(student.id)
      expect(result.value.question.attachments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            url: attachment.url,
            title: attachment.title,
          }),
        ]),
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
