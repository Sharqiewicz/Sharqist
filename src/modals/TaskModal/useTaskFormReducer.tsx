import { useEffect, useReducer } from 'react'
import moment from 'moment'

import { ChangeEvent } from '../TaskModal/TaskModal'
import { INewTask } from '../../interfaces/ITask'

type TaskFormState = INewTask

type TaskFormAction = {
  name: string
  value: string | number | boolean | Date
}

export const useTaskFormReducer = (initialValue?: INewTask) => {
  const setNewTaskDate = (date: Date) => {
    setTaskFormData({
      name: 'date',
      value: moment.utc(date).startOf('day').toDate(),
    })
  }

  const taskFormReducer = (state: TaskFormState, event: TaskFormAction) => {
    return {
      ...state,
      [event.name]: event.value,
    }
  }

  const baseInitalValue: INewTask = {
    date: moment.utc(new Date()).startOf('day').toDate(),
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
        if (key === 'date') {
          setNewTaskDate(new Date(value as string))
        } else {
          setTaskFormData({ name: key, value })
        }
      }
    }
  }, [initialValue])

  return {
    handleTaskFormChange,
    taskFormData,
    setNewTaskDate,
  }
}
