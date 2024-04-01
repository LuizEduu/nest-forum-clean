import { Module } from '@nestjs/common'

import { PrismaService } from './prima/prisma.service'

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
