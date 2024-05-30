import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Slug } from './slug'
import { Attachment } from '../attachment'

export interface QuestionDetailsProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  author: string
  title: string
  content: string
  slug: Slug
  attachments: Attachment[]
  bestAnswerId?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get questionId(): UniqueEntityID {
    return this.props.questionId
  }

  get authorId(): UniqueEntityID {
    return this.props.authorId
  }

  get author(): string {
    return this.props.author
  }

  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get slug(): Slug {
    return this.props.slug
  }

  get attachments(): Attachment[] {
    return this.props.attachments
  }

  get bestAnswerId(): UniqueEntityID | null | undefined {
    return this.props.bestAnswerId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined | null {
    return this.props.updatedAt
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props)
  }
}
