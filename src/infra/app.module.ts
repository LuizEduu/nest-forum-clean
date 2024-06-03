import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { HttpModule } from './http/http.module'
import { EnvService } from './env/env.service'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'

@Module({
  // importar outros modulos
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env), // faz a validação das envs e retorna um erro caso esteja faltando algo
      isGlobal: true, // tornar o módulo global para não precisar configurar nos outros modules
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    EventsModule,
  ],
  providers: [EnvService],
})
export class AppModule {}
