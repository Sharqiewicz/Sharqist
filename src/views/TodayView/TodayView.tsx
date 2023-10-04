import { ITask } from '../../interfaces/ITask'
import { useModal } from '../../modals/ModalsContext'
import { TasksList } from '../../components/TaskList/TaskList'
import useFetchTasks from '../../hooks/useFetchTasks'

function TodayView() {
  const { MODALS, openModal } = useModal()

  const tasks: ITask[] = useFetchTasks('get_today_tasks')

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Today</h1>
      <div className='row'></div>

      <TasksList tasks={tasks} />

      <hr className='my-5' />

      <div className='flex justify-center w-full'>
        <button
          onClick={() => openModal(MODALS.ADD_TASK_MODAL)}
          type='button'
          className='button-first'
        >
          Add Task
        </button>
      </div>
    </>
  )
}

export { TodayView }
