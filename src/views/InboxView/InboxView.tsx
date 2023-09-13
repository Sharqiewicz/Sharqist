import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { ITask } from '../../interfaces/ITask'
import { Task } from '../../components/Task/Task'
import { useModal } from '../../modals/ModalsContext'

function InboxView() {
  const { MODALS, openModal } = useModal()

  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    ;(async () => {
      setTasks(await invoke('get_all_tasks'))
    })()
  }, [])

  const renderTasks = () => {
    if (tasks.length) {
      return tasks.map(task => <Task {...task} />)
    } else {
      return <p>Aucun taches pour aujourd'hui</p>
    }
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-3 text-gray-700'>Inbox</h1>
      <div className='row'></div>

      {renderTasks()}

      <hr className='my-5' />

      <div className='w-full flex justify-center'>
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
