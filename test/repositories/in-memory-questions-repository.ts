import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { InMemoryStudentsRepository } from './in-memory-students-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = []

  constructor(
    private readonly inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private readonly inMemoryAttachmentsRepository: InMemoryAttachmentsRepository,
    private readonly inMemoryStudentsRepository: InMemoryStudentsRepository,
  ) {}

  async create(question: Question) {
    this.questions.push(question)

    await this.inMemoryQuestionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question) {
    const index = this.questions.findIndex(
      (item) => item.id.toString() === question.id.toString(),
    )

    await this.inMemoryQuestionAttachmentsRepository.createMany(
      question.attachments.getNewItems(),
    )

    await this.inMemoryQuestionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems(),
    )

    this.questions[index] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    return question ?? null
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    if (!question) {
      return null
    }

    const author = this.inMemoryStudentsRepository.students.find((student) =>
      student.id.equals(question?.authorId),
    )

    if (!author) {
      throw new Error(
        `Author with id "${question.authorId.toString()}" does not exists`,
      )
    }

    const questionAttachments =
      this.inMemoryQuestionAttachmentsRepository.questionAttachments.filter(
        (qt) => qt.questionId.equals(question.id),
      )

    const attachments = questionAttachments.map((qt) => {
      const attachment = this.inMemoryAttachmentsRepository.attachments.find(
        (at) => at.id.equals(qt.attachmentId),
      )

      if (!attachment) {
        throw new Error(
          `attachment with id "${qt.attachmentId.toString()}" does not exists`,
        )
      }

      return Attachment.create(attachment)
    })

    return QuestionDetails.create({
      author: author.name,
      authorId: author.id,
      content: question.content,
      questionId: question.id,
      slug: question.slug,
      title: question.title,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      attachments,
      bestAnswerId: question.bestAnswerId,
    })
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.id.toString() === id,
    )

    return question ?? null
  }

  async delete(question: Question) {
    const index = this.questions.findIndex((item) => item.id === question.id)

    this.questions.splice(index, 1)

    this.inMemoryQuestionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }
}
