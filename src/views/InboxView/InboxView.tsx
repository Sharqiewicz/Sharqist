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
      <h1>Bonjour</h1>
      <div className='row'></div>

      <button onClick={() => setAddTaskModalOpen(true)}>Add a task</button>

      {renderTasks()}

      <form
        className='row'
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <input
          id='greet-input'
          onChange={e => setName(e.currentTarget.value)}
          placeholder='Enter a name...'
        />
        <button onClick={getAllTasks}>Greet</button>
      </form>
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        closeModal={() => setAddTaskModalOpen(false)}
      />
    </>
  )
}

export { InboxView }
