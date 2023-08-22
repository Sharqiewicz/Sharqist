import { ITask } from '../../interfaces/ITask'

export const Task = (task: ITask) => {
  const { name, description, date } = task
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  )
}
