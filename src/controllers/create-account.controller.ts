import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @Post()
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body
  }
}
