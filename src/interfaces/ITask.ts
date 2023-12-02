export interface ITask {
  id: number
  name: string
  description: string
  date: Date
  is_done: boolean
  project_id?: number
}

export type INewTask = Omit<ITask, 'id'>
