import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import moment from 'moment'

import { ITask } from '../interfaces/ITask'

const useFetchTasks = (taskType: string) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [,] = useState<ITask[]>([])

  const fetchTasks = async () => {
    const allTasks: ITask[] = await invoke(taskType)

    allTasks.sort((a: ITask, b: ITask) => {
      return moment(a.date).isAfter(b.date) ? 1 : -1
    })

    setTasks(allTasks)
  }

  useEffect(() => {
    fetchTasks()
  }, [tasks])

  const forceTasksFetchUpdate = () => {
    setTasks([])
  }

  return { tasks, forceTasksFetchUpdate }
}

export { useFetchTasks }
