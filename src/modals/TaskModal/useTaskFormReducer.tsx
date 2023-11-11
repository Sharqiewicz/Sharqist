import { useEffect, useReducer, useState } from 'react'
import moment from 'moment'

import { ChangeEvent } from '../TaskModal/TaskModal'
import { INewTask } from '../../interfaces/ITask'

type TaskFormState = INewTask

type TaskFormAction = {
  name: string
  value: string | number | boolean
}

export const useTaskFormReducer = (initialValue?: INewTask) => {
  const [taskDate, setTaskDate] = useState(
    moment.utc(new Date()).startOf('day').toDate(),
  )

  const setNewTaskDate = (date: Date) => {
    setTaskDate(moment.utc(date).startOf('day').toDate())
  }

  const taskFormReducer = (state: TaskFormState, event: TaskFormAction) => {
    return {
      ...state,
      [event.name]: event.value,
    }
  }

  const baseInitalValue: INewTask = {
    date: '',
    description: '',
    is_done: false,
    name: '',
  }

  const [taskFormData, setTaskFormData] = useReducer(
    taskFormReducer,
    baseInitalValue,
  )

  const handleTaskFormChange = (event: ChangeEvent) => {
    const action = {
      name: event.target.name,
      value: event.target.value,
    }
    setTaskFormData(action)
  }

  useEffect(() => {
    if (initialValue) {
      for (const [key, value] of Object.entries(initialValue)) {
        setTaskFormData({ name: key, value })
      }
    }
  }, [initialValue])

  return {
    handleTaskFormChange,
    taskFormData,
    setNewTaskDate,
    taskDate,
  }
}
