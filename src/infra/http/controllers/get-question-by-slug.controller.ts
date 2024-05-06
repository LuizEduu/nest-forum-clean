import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'

import GetQuestionBySlugUseCase from '@/domain/forum/application/use-cases/get-question-by-slug'
import { HttpQuestionPresenter } from '../presenters/http-question-presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private readonly getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Param('slug')
    slug: string,
  ) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: HttpQuestionPresenter.toHTTP(result.value.question) }
  }
}
