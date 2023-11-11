export interface ITask {
  id: number
  name: string
  description: string
  date: Date
  is_done: boolean
}

export type INewTask = Omit<ITask, 'id'>
