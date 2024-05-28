import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryQuestionCommentsRepository: QuestionCommentsRepository
let studentsRepository: InMemoryStudentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      studentsRepository,
    )
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    await studentsRepository.create(student)

    const comment1 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1'),
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-2'),
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() && expect(result.value.comments).toHaveLength(2)
    result.isRight() &&
      expect(result.value.comments).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            commentId: comment1.id,
            author: 'John Doe',
          }),
          expect.objectContaining({
            commentId: comment2.id,
            author: 'John Doe',
          }),
        ]),
      )
  })

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent()
    await studentsRepository.create(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          authorId: student.id,
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() && expect(result.value.comments).toHaveLength(2)
  })
})
