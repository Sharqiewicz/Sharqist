import { ITask } from '../../interfaces/ITask'
import { Task } from '../../components/Task/Task'

interface TasksListProps {
  tasks: ITask[]
}

function TasksList({ tasks }: TasksListProps) {
  if (tasks.length) {
    return (
      <>
        {tasks.map(task => (
          <Task {...task} />
        ))}
      </>
    )
  } else {
    return <p>Aucun taches pour aujourd'hui</p>
  }
}

export { TasksList }
