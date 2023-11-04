import { createPortal } from 'react-dom'
import { FormEventHandler, useReducer, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { DatePicker } from '../../components/Form/DatePicker'
import { Description } from '../../components/Form/Description'
import { ProjectsList } from '../../components/Form/ProjectsList'
import { ButtonPrimary } from '../../components/Button/ButtonPrimary'
import { TextInput } from '../../components/Form/TextInput'
import { ModalHeader } from '../components/ModalHeader/ModalHeader'

type FormState = {
  [key: string]: string | number | boolean
}

type FormAction = {
  name: string
  value: string | number | boolean
}

const formReducer = (state: FormState, event: FormAction) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

export const EditTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const [date, setDate] = useState(
    moment.utc(new Date()).startOf('day').toDate(),
  )

  const setNewDate = (date: Date) => {
    setDate(moment.utc(date).startOf('day').toDate())
  }
  const [formData, setFormData] = useReducer(formReducer, {})

  const handleChange = (event: ChangeEvent) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    await invoke('edit_task', {
      name: formData.name,
      description: formData.description || '',
      date: moment.utc(date).startOf('day').format('YYYY-MM-DD'),
      id,
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
      }),
      document.getElementById('root') || document.body,
    )
  ) : (
    <></>
  )
}

const ButtonSVG = () => (
  <svg
    className='w-5 h-5 me-1 -ms-1'
    fill='currentColor'
    viewBox='0 0 20 20'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
      clipRule='evenodd'
    ></path>
  </svg>
)

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
interface RenderTaskModalProps {
  isOpen: boolean
  closeModal: () => void
  date: Date
  setDate: (date: Date) => void
  handleChange: (event: ChangeEvent) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

const renderTaskModal = ({
  isOpen,
  closeModal,
  date,
  setDate,
  handleChange,
  onSubmit,
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
        <form className='p-4 md:p-5' onSubmit={onSubmit}>
          <TextInput
            handleChange={
              handleChange as (event: React.ChangeEvent<Element>) => void
            }
          />
          <div className='flex items-center justify-between'>
            <DatePicker date={date} setDate={setDate} />
            <ProjectsList handleChange={handleChange} />
          </div>
          <Description handleChange={handleChange} />

          <ButtonPrimary {...{ text: 'Create Task', svg: <ButtonSVG /> }} />
        </form>
      </div>
    </div>
  </section>
)
