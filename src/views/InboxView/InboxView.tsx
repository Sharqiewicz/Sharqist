import { ITask } from '../../interfaces/ITask'
import { useModal } from '../../modals/ModalsContext'
import { TasksList } from '../../components/TaskList/TaskList'
import { useFetchTasks } from '../../hooks/useFetchTasks'

function InboxView() {
  const { MODALS, openModal } = useModal()

  const {
    tasks,
    forceTasksFetchUpdate,
  }: { tasks: ITask[]; forceTasksFetchUpdate: () => void } =
    useFetchTasks('get_inbox_tasks')

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Inbox</h1>
      <div className='row'></div>

      <TasksList tasks={tasks} forceTasksFetchUpdate={forceTasksFetchUpdate} />

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

export { InboxView }
