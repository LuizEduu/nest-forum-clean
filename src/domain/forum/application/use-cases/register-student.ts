import { HashGenerator } from '../cryptography/hash-generator'
import { StudentsRepository } from '../repositories/students-repository'
import {
  RegisterStudentUseCaseRequestDTO,
  RegisterStudentUseCaseResponseDTO,
} from './dto'
import { left, right } from '@/core/either'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error'
import { Student } from '../../enterprise/entities/student'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequestDTO): Promise<RegisterStudentUseCaseResponseDTO> {
    const userWithSameEmail = await this.studentsRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new StudentAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}
