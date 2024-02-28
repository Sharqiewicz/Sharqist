import { useState } from 'react'
import { ITask } from '../../interfaces/ITask'
import { Task } from '../../components/Task/Task'

interface TasksListProps {
  tasks: ITask[]
  forceTasksFetchUpdate: () => void
}

function areDatesDifferent(date1: Date, date2: Date): boolean {
  return date1.getTime() !== date2.getTime();
}

function TasksList({ tasks, forceTasksFetchUpdate }: TasksListProps) {

  const [lastDate, setLastDate] = useState<Date | undefined>()

  if (tasks.length) {
    return (
      <>
        {tasks.map(task => {
          const showLine = lastDate ? areDatesDifferent(lastDate, new Date(task.date)) : false

          setLastDate(task.date);

          return (
            <>
              {showLine && <hr />}
              <Task {...{ task, forceTasksFetchUpdate }} key={task.id} />
            </>
          )
        })}
      </>
    )
  } else {
    return <p>No tasks to be displayed</p>
  }
}

export { TasksList }
