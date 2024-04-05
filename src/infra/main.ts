import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Env } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<ConfigService<Env, true>>(ConfigService) // vai buscar uma intancia do config service que foi definida no AppModule

  const port = configService.get('PORT', { infer: true })
  await app.listen(port)
}
bootstrap()
