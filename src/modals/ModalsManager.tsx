import React from 'react'
import { useModal } from './ModalsContext'
import { AddTaskModal } from './AddTaskModal/AddTaskModal'

const ModalsManager: React.FC = () => {
  const { modals, closeModal, MODALS } = useModal()

  return (
    <>
      <AddTaskModal
        closeModal={() => closeModal(MODALS.ADD_TASK_MODAL)}
        isOpen={modals[MODALS.ADD_TASK_MODAL]}
      />
    </>
  )
}

export { ModalsManager }
