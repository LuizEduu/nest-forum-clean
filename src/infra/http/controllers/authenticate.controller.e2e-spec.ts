import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    const hashedPassword = await hash('123456', 8)

    const createdUser = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
      },
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
        error: 'Unauthorized',
        message: 'User credentials does not match.',
        statusCode: 401,
      }),
    )
  })

  test('[POST] /sessions invalid password', async () => {
    const hashedPassword = await hash('123456', 8)

    const createdUser = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe2@example.com',
        password: hashedPassword,
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: createdUser.email,
      password: '1234',
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Unauthorized',
        message: 'User credentials does not match.',
        statusCode: 401,
      }),
    )
  })
})
