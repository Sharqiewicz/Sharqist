import { useReducer, useState } from 'react'
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

  const baseState = initialValue || baseInitalValue

  const [taskFormData, setTaskFormData] = useReducer(taskFormReducer, baseState)

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