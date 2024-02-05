import { ITask } from '../../interfaces/ITask'
import { TasksList } from '../../components/TaskList/TaskList'
import { useFetchTasks } from '../../hooks/useFetchTasks'
import { useModal } from '../../modals/ModalsContext'

function UpcomingView() {
  const { MODALS, openModal } = useModal()
  const {
    tasks,
    forceTasksFetchUpdate,
  }: { tasks: ITask[]; forceTasksFetchUpdate: () => void } =
    useFetchTasks('get_future_tasks')

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Upcoming</h1>
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

export { UpcomingView }
