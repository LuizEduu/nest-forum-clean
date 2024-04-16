import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentsRepository } from '../repositories/students-repository'
import { RegisterStudentUseCase } from './register-student'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'

let studentsRepository: StudentsRepository
let hashGenerator: HashGenerator
let sut: RegisterStudentUseCase

describe('Register Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    hashGenerator = new FakeHasher()
    sut = new RegisterStudentUseCase(studentsRepository, hashGenerator)
  })

  it('shoud be able to register a new student', async () => {
    const student = makeStudent()

    const result = await sut.execute({
      email: student.email,
      name: student.name,
      password: student.password,
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() &&
      expect(result.value.student.email).toEqual(student.email)
    result.isRight() && expect(result.value.student.name).toEqual(student.name)
  })

  it('shoud not be able to register a exists student', async () => {
    const student = makeStudent({ email: 'exists-email@test.com' })
    await studentsRepository.create(student)

    const result = await sut.execute({
      email: student.email,
      name: student.name,
      password: student.password,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(StudentAlreadyExistsError)
  })

  it('shoud hash student password upon registration', async () => {
    const student = makeStudent()

    const result = await sut.execute({
      email: student.email,
      name: student.name,
      password: student.password,
    })

    const findStudent = await studentsRepository.findByEmail(student.email)

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() &&
      expect(findStudent?.password).toEqual(`${student.password}-hashed`)
  })
})
