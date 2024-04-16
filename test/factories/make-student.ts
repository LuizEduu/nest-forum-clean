import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student'

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
