import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student as StudentDomain } from '@/domain/forum/enterprise/entities/student'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaStudentMapper {
  static toDomain(raw: PrismaUser): StudentDomain {
    return StudentDomain.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(student: StudentDomain): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}
