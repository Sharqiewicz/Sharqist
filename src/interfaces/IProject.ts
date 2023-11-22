export interface IProject {
  name: string
  description: string
  color: string
  id: number
}
export type INewProject = Omit<IProject, 'id'>
