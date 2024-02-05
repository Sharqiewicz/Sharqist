import { ITask } from '../../interfaces/ITask'
import { useModal } from '../../modals/ModalsContext'
import { TasksList } from '../../components/TaskList/TaskList'
import { useFetchTasks } from '../../hooks/useFetchTasks'

function TodayView() {
  const { MODALS, openModal } = useModal()

  const {
    tasks,
    forceTasksFetchUpdate,
  }: { tasks: ITask[]; forceTasksFetchUpdate: () => void } =
    useFetchTasks('get_today_tasks')

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Today</h1>
      <div className='row'></div>

      <TasksList tasks={tasks} forceTasksFetchUpdate={forceTasksFetchUpdate} />

      <hr className='my-5' />

      <div className='flex justify-center w-full'>
        <button
          onClick={() => openModal(MODALS.ADD_TASK_MODAL)}
          type='button'
          className='button-secondary'
        >
          Add Task
        </button>
      </div>
    </>
  )
}

export { TodayView }
