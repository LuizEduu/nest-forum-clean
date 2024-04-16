import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { StudentsRepository } from '../repositories/students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let studentsRepository: StudentsRepository
let hashCompare: HashComparer
let encrypter: Encrypter
let sut: AuthenticateStudentUseCase
let fakeHasher: FakeHasher

describe('Authenticate Student Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    hashCompare = new FakeHasher()
    encrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      studentsRepository,
      hashCompare,
      encrypter,
    )
    fakeHasher = new FakeHasher()
  })

  it('shoud be able to authenticate an student', async () => {
    const student = makeStudent({
      password: await fakeHasher.hash('123456'),
    })

    await studentsRepository.create(student)

    const result = await sut.execute({
      email: student.email,
      password: '123456',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    result.isRight() &&
      expect(result.value.accessToken).toEqual(expect.any(String))
  })

  it('shoud not be able to authenticate student wen is not exists', async () => {
    const student = makeStudent()

    const result = await sut.execute({
      email: student.email,
      password: student.password,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('shoud not be able to authenticate student wen password does not match', async () => {
    const student = makeStudent()

    await studentsRepository.create(student)

    const spyEncrypter = vi.spyOn(encrypter, 'encrypt')

    const result = await sut.execute({
      email: student.email,
      password: 'wrong password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
    expect(spyEncrypter).toHaveBeenCalledTimes(0)
  })
})
