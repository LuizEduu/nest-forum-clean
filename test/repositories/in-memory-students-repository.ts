import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []

  async create(student: Student): Promise<void> {
    this.students.push(student)
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.students.find((student) => student.email === email)

    return student ?? null
  }
}
