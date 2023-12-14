import { createPortal } from 'react-dom'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { TaskModal } from '../TaskModal/TaskModal'
import { useTaskFormReducer } from '../TaskModal/useTaskFormReducer'
import { useModal } from '../ModalsContext'
import { INewTask } from '../../interfaces/ITask'

export const EditTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const { modalOptions } = useModal()

  const { handleTaskFormChange, setNewTaskDate, taskFormData } =
    useTaskFormReducer(modalOptions as INewTask)

  const onSubmit = async (e: any) => {
    e.preventDefault()

    if (modalOptions && modalOptions.id) {
      await invoke('edit_task', {
        name: taskFormData.name,
        description: taskFormData.description || '',
        date: moment.utc(taskFormData.date).startOf('day').format('YYYY-MM-DD'),
        id: modalOptions.id,
        projectId: Number(taskFormData.project_id) || null,
      })

      closeModal()
    }
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
        title: 'Edit task',
        button: 'Edit',
      }}
    />,
    document.getElementById('root') || document.body,
  )
}
