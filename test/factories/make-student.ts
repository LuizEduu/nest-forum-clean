import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaStudentMapper } from '@/infra/database/prisma/mappers/prisma-student-mapper'

/**
 * @type {object}
 * @property {UniqueEntityID} id - id do estudante.
 * @property {string} name - nome do estudante.
 * @property {string} email - e-mail do estudanbte.
 * @property {string} password - senha do estudante.
 *
 * @type {UniqueEntityID} id - criar estudante com id especifíco.
 *
 * @returns {Student}
 */
export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
): Student {
  return Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class StudentFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaStudent(data: Partial<StudentProps> = {}): Promise<Student> {
    const student = makeStudent(data)

    await this.prismaService.user.create({
      data: PrismaStudentMapper.toPrisma(student),
    })

    return student
  }
}
