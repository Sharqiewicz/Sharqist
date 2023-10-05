import { ITask } from '../../interfaces/ITask'
import { TasksList } from '../../components/TaskList/TaskList'
import { useFetchTasks } from '../../hooks/useFetchTasks'

function HistoryView() {
  const tasks: ITask[] = useFetchTasks('get_history_tasks')

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>History</h1>
      <div className='row'></div>

      <TasksList tasks={tasks} />
    </>
  )
}

export { HistoryView }
