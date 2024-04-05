export interface EditQuestionUseCaseRequestDTO {
  authorId: string
  title: string
  content: string
  questionId: string
  attachmentsIds: string[]
}
