import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { ITask } from '../../interfaces/ITask'
import { Task } from '../../components/Task/Task'
import { useModal } from '../../modals/ModalsContext'
import moment from 'moment'

function TodayView() {
  const { MODALS, openModal } = useModal()

  const [tasks, setTasks] = useState<ITask[]>([])

  useEffect(() => {
    ;(async () => {
      const allTasks: ITask[] = await invoke('get_all_tasks')

      allTasks.sort((a: ITask, b: ITask) => {
        return moment(a.date).isAfter(b.date) ? 1 : -1
      })

      setTasks(allTasks)
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
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Today</h1>
      <div className='row'></div>

      {renderTasks()}

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
