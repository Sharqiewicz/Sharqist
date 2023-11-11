import { createPortal } from 'react-dom'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { TaskModal } from '../TaskModal/TaskModal'
import { useTaskFormReducer } from '../TaskModal/useTaskFormReducer'
import { useModal } from '../ModalsContext'

export const EditTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const { modalOptions } = useModal()

  const { handleTaskFormChange, setNewTaskDate, taskDate, taskFormData } =
    useTaskFormReducer(modalOptions)

  const onSubmit = async (e: any) => {
    e.preventDefault()

    if (modalOptions && modalOptions.id) {
      await invoke('edit_task', {
        name: taskFormData.name,
        description: taskFormData.description || '',
        date: moment.utc(taskDate).startOf('day').format('YYYY-MM-DD'),
        id: modalOptions.id,
      })
    }
  }

  if (!isOpen) return null

  console.log('taskFormData')
  console.log(taskFormData)
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
        title: 'Edit task',
        button: 'Edit',
      }}
    />,
    document.getElementById('root') || document.body,
  )
}
