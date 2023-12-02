import { createPortal } from 'react-dom'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { TaskModal } from '../TaskModal/TaskModal'
import { useTaskFormReducer } from '../TaskModal/useTaskFormReducer'
import { INewTask } from '../../interfaces/ITask'

export const AddTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const { handleTaskFormChange, setNewTaskDate, taskFormData } =
    useTaskFormReducer()

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const task: Omit<INewTask, 'is_done'> = {
      name: taskFormData.name,
      description: taskFormData.description || '',
      date: moment
        .utc(taskFormData.date)
        .startOf('day')
        .format('YYYY-MM-DD') as unknown as Date,
    }

    console.log('taskFormData')
    console.log(taskFormData)
    console.log(taskFormData.project_id)

    //@ts-ignore
    if (taskFormData.project_id !== 'None') {
      //@ts-ignore
      task['projectId'] = taskFormData.project_id
    }

    console.log('sending!', task)
    await invoke('add_task', task)
  }

  if (!isOpen) return null

  return createPortal(
    <TaskModal
      isOpen={isOpen}
      closeModal={closeModal}
      onSubmit={onSubmit}
      setNewTaskDate={setNewTaskDate}
      handleTaskFormChange={handleTaskFormChange}
      taskFormData={taskFormData}
      texts={{
        title: 'Add task',
        button: 'Add task',
      }}
    />,
    document.getElementById('root') || document.body,
  )
}
