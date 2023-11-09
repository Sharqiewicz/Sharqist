import React from 'react'
import { useModal } from './ModalsContext'
import { AddTaskModal } from './AddTaskModal/AddTaskModal'
import { EditTaskModal } from './EditTaskModal/EditTaskModal'

const ModalsManager: React.FC = () => {
  const { modals, closeModal, MODALS } = useModal()

  return (
    <>
      <AddTaskModal
        closeModal={() => closeModal(MODALS.ADD_TASK_MODAL)}
        isOpen={modals[MODALS.ADD_TASK_MODAL]}
      />
      <EditTaskModal
        closeModal={() => closeModal(MODALS.EDIT_TASK_MODAL)}
        isOpen={modals[MODALS.EDIT_TASK_MODAL]}
      />
    </>
  )
}

export { ModalsManager }
