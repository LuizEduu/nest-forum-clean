import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { SessionsAuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'

@Module({
  // importar outros modulos
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // faz a validação das envs e retorna um erro caso esteja faltando algo
      isGlobal: true, // tornar o módulo global para não precisaar configurar nos outros modules
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    SessionsAuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
