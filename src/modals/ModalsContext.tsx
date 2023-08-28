import React, { createContext, useContext, useState, ReactNode } from 'react'

enum MODALS_ENUM {
  ADD_TASK_MODAL = 'AddTaskModal',
  REMINDER_MODAL = 'AddTaskModal',
}

export type ModalsKeys = (typeof MODALS_ENUM)[keyof typeof MODALS_ENUM]

interface ModalContextProps {
  modals: Record<string, boolean>
  openModal: (modalName: ModalsKeys) => void
  closeModal: (modalName: ModalsKeys) => void
  MODALS: typeof MODALS_ENUM
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

interface ModalProviderProps {
  children: ReactNode
}

const ModalsProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({})

  const openModal = (modalName: ModalsKeys) => {
    setModals(prevModals => ({
      ...prevModals,
      [modalName]: true,
    }))
  }

  const closeModal = (modalName: ModalsKeys) => {
    setModals(prevModals => ({
      ...prevModals,
      [modalName]: false,
    }))
  }

  return (
    <ModalContext.Provider
      value={{ modals, openModal, closeModal, MODALS: MODALS_ENUM }}
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
