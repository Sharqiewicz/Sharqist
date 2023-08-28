import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { ITask } from '../../interfaces/ITask'
import { Task } from '../../components/Task/Task'
import { AddTaskModal } from '../../modals/AddTaskModal/AddTaskModal'

function InboxView() {
  const [name, setName] = useState('')
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState<boolean>(false)
  const [tasks, setTasks] = useState<ITask[]>([])

  const getAllTasks = async () => {
    await addTask()
    setTasks(await invoke('get_all_tasks'))
  }

  useEffect(() => {
    ;(async () => {
      setTasks(await invoke('get_all_tasks'))
    })()
  }, [])

  const addTask = async () => {
    const task: ITask = {
      date: '2023-12-12',
      description: 'This is an example task',
      name: 'An example task',
    }

    await invoke('add_task', { ...task })
  }

  const renderTasks = () => {
    if (tasks.length) {
      return tasks.map(task => <Task {...task} />)
    } else {
      return <p>Aucun taches pour aujourd'hui</p>
    }
  }

  return (
    <>
      <h1 className='text-xl'>Today</h1>
      <div className='row'></div>

      {renderTasks()}

      <hr className='my-5' />

      <button
        onClick={() => setAddTaskModalOpen(true)}
        type='button'
        className='text-white bg-gradient-to-br from-purple-600 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
      >
        Add Task
      </button>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        closeModal={() => setAddTaskModalOpen(false)}
      />
    </>
  )
}

export { InboxView }
