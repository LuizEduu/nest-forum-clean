export interface CreateQuestionUseCaseRequestDTO {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}
