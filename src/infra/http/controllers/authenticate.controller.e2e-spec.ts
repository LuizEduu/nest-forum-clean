import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    const hashedPassword = await hash('123456', 8)

    const createdUser = await studentFactory.makePrismaStudent({
      password: hashedPassword,
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: createdUser.email,
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
      }),
    )
  })

  test('[POST] /sessions user not exists', async () => {
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'not-exists-email@test.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Unauthorized',
        statusCode: 401,
      }),
    )
  })

  test('[POST] /sessions invalid password', async () => {
    const hashedPassword = await hash('123456', 8)

    const createdUser = await studentFactory.makePrismaStudent({
      password: hashedPassword,
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: createdUser.email,
      password: '1234',
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Unauthorized',
        statusCode: 401,
      }),
    )
  })
})
