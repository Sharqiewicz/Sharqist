import { createPortal } from 'react-dom'
import { FormEventHandler, useReducer, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { ModalHeader } from '../components/ModalHeader/ModalHeader'
import { TaskForm } from '../../components/Form/TaskForm'
import { INewTask } from '../../interfaces/ITask'

type FormState = INewTask

type FormAction = {
  name: string
  value: string | number | boolean
}

export const AddTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const [date, setDate] = useState(
    moment.utc(new Date()).startOf('day').toDate(),
  )

  const setNewDate = (date: Date) => {
    setDate(moment.utc(date).startOf('day').toDate())
  }

  const formReducer = (state: FormState, event: FormAction) => {
    return {
      ...state,
      [event.name]: event.value,
    }
  }

  const initalValue: INewTask = {
    date: '',
    description: '',
    is_done: false,
    name: '',
  }

  const [formData, setFormData] = useReducer(formReducer, initalValue)

  const handleChange = (event: ChangeEvent) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    await invoke('add_task', {
      name: formData.name,
      description: formData.description || '',
      date: moment.utc(date).startOf('day').format('YYYY-MM-DD'),
    })
  }

  return isOpen ? (
    createPortal(
      renderTaskModal({
        isOpen,
        closeModal,
        date,
        setDate: setNewDate,
        handleChange,
        onSubmit,
        formData,
      }),
      document.getElementById('root') || document.body,
    )
  ) : (
    <></>
  )
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
interface RenderTaskModalProps {
  isOpen: boolean
  closeModal: () => void
  date: Date
  setDate: (date: Date) => void
  handleChange: (event: ChangeEvent) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  formData: INewTask
}

const renderTaskModal = ({
  isOpen,
  closeModal,
  date,
  setDate,
  handleChange,
  onSubmit,
  formData,
}: RenderTaskModalProps) => (
  <section
    id='crud-modal'
    tabIndex={-1}
    aria-hidden={!isOpen}
    className='fixed top-0 bottom-0 left-0 right-0 z-50 items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto md:inset-0 '
  >
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black opacity-80'></div>
    <div className='relative w-full max-w-md max-h-full p-4'>
      <div className='fixed w-2/5 bg-gray-900 rounded-lg shadow min-w-min z-60 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'>
        <ModalHeader closeModal={closeModal} />
        <TaskForm
          initialValues={formData}
          handleChange={
            handleChange as (event: React.ChangeEvent<Element>) => void
          }
          handleSubmit={onSubmit}
          date={date}
          setDate={setDate}
        />
      </div>
    </div>
  </section>
)
