import { Either } from '@/core/either'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { StudentAlreadyExistsError } from '../errors/student-already-exists-error'

export type RegisterStudentUseCaseResponseDTO = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>
