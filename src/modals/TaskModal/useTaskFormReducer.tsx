import { useReducer, useState } from 'react'
import moment from 'moment'

import { ChangeEvent } from '../TaskModal/TaskModal'
import { INewTask } from '../../interfaces/ITask'

type TaskFormState = INewTask

type TaskFormAction = {
  name: string
  value: string | number | boolean
}

export const useTaskFormReducer = () => {
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

  const initalValue: INewTask = {
    date: '',
    description: '',
    is_done: false,
    name: '',
  }

  const [taskFormData, setTaskFormData] = useReducer(
    taskFormReducer,
    initalValue,
  )

  const handleTaskFormChange = (event: ChangeEvent) => {
    setTaskFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  return {
    handleTaskFormChange,
    taskFormData,
    setNewTaskDate,
    taskDate,
  }
}
