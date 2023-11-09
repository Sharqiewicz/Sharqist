import { createPortal } from 'react-dom'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { TaskModal } from '../TaskModal/TaskModal'
import { useTaskFormReducer } from '../TaskModal/useTaskFormReducer'

export const AddTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const { handleTaskFormChange, setNewTaskDate, taskDate, taskFormData } =
    useTaskFormReducer()

  const onSubmit = async (e: any) => {
    e.preventDefault()

    await invoke('add_task', {
      name: taskFormData.name,
      description: taskFormData.description || '',
      date: moment.utc(taskDate).startOf('day').format('YYYY-MM-DD'),
    })
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
      taskDate={taskDate}
      texts={{
        title: 'Add task',
        button: 'Add task',
      }}
    />,
    document.getElementById('root') || document.body,
  )
}
