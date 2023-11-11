import { FormEventHandler } from 'react'

import { INewTask } from '../../interfaces/ITask'
import { ModalHeader } from '../components/ModalHeader/ModalHeader'
import { TaskForm } from '../../components/Form/TaskForm'

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

interface TaskModalProps {
  isOpen: boolean
  closeModal: () => void
  onSubmit: FormEventHandler<HTMLFormElement>

  taskFormData: INewTask
  setNewTaskDate: (date: Date) => void
  handleTaskFormChange: (event: ChangeEvent) => void
  texts: {
    title: string
    button: string
  }
}

export const TaskModal = ({
  isOpen,
  closeModal,
  onSubmit,
  setNewTaskDate,
  handleTaskFormChange,
  taskFormData,
  texts,
}: TaskModalProps) => (
  <section
    id='crud-modal'
    tabIndex={-1}
    aria-hidden={!isOpen}
    className='fixed top-0 bottom-0 left-0 right-0 z-50 items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto md:inset-0 '
  >
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black opacity-80'></div>
    <div className='relative w-full max-w-md max-h-full p-4'>
      <div className='fixed w-2/5 bg-gray-900 rounded-lg shadow min-w-min z-60 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'>
        <ModalHeader closeModal={closeModal} text={texts.title} />
        <TaskForm
          taskFormData={taskFormData}
          handleChange={
            handleTaskFormChange as (event: React.ChangeEvent<Element>) => void
          }
          handleSubmit={onSubmit}
          setDate={setNewTaskDate}
          buttonText={texts.button}
        />
      </div>
    </div>
  </section>
)
