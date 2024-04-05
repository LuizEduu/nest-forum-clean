export interface EditAnswerUseCaseRequestDTO {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}
