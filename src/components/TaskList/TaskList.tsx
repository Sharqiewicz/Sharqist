import { ITask } from '../../interfaces/ITask'
import { Task } from '../../components/Task/Task'

interface TasksListProps {
  tasks: ITask[]
  forceTasksFetchUpdate: () => void
}

function TasksList({ tasks, forceTasksFetchUpdate }: TasksListProps) {
  if (tasks.length) {
    return (
      <>
        {tasks.map(task => (
          <Task {...{ task, forceTasksFetchUpdate }} key={task.id} />
        ))}
      </>
    )
  } else {
    return <p>No tasks to be displayed</p>
  }
}

export { TasksList }
