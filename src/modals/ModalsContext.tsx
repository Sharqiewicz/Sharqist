import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ITask } from '../interfaces/ITask'

enum MODALS_ENUM {
  ADD_TASK_MODAL = 'AddTaskModal',
  EDIT_TASK_MODAL = 'EditTaskModal',
}

export type ModalsKeys = (typeof MODALS_ENUM)[keyof typeof MODALS_ENUM]

export type ModalOptions = ITask | undefined
interface ModalContextProps {
  modals: Record<string, boolean>
  openModal: (modalName: ModalsKeys, modalOptions?: ModalOptions) => void
  closeModal: (modalName: ModalsKeys) => void
  MODALS: typeof MODALS_ENUM
  modalOptions: ModalOptions
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

interface ModalProviderProps {
  children: ReactNode
}

const ModalsProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({})
  const [modalOptions, setModalOptions] = useState<ModalOptions>()

  const openModal = (modalName: ModalsKeys, modalOptions: ModalOptions) => {
    setModals({
      [modalName]: true,
    })
    console.log('setModalOptions')
    console.log(modalOptions)
    setModalOptions(modalOptions)
  }

  const closeModal = (modalName: ModalsKeys) => {
    setModals({
      [modalName]: false,
    })
  }

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        MODALS: MODALS_ENUM,
        modalOptions,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export { ModalsProvider, useModal }
