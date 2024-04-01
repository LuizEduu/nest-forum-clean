import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prima/prisma.service'
import { envSchema } from './env'

@Module({
  // importar outros modulos
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // faz a validação das envs e retorna um erro caso esteja faltando algo
      isGlobal: true, // tornar o módulo global para não precisaar configurar nos outros modules
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
