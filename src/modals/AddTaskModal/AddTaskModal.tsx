import { createPortal } from 'react-dom'
import { FormEventHandler, useReducer, useState } from 'react'
import { invoke } from '@tauri-apps/api'
import moment from 'moment'

import { DatePicker } from '../../components/Form/DatePicker'
import { Description } from '../../components/Form/Description'
import { ProjectsList } from '../../components/Form/ProjectsList'

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
  const [formData, setFormData] = useReducer(formReducer, {})

  const handleChange = (event: ChangeEvent) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const onSubmit = async (e: any) => {
    // @todo preventDefault
    e.preventDefault()
    console.log(moment.utc(date).startOf('day').format('YYYY-MM-DD'))
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
        {renderHeader({ closeModal })}
        <form className='p-4 md:p-5' onSubmit={onSubmit}>
          {renderTaskName(handleChange)}
          <div className='flex items-center justify-between'>
            <DatePicker date={date} setDate={setDate} />
            <ProjectsList handleChange={handleChange} />
          </div>
          <Description handleChange={handleChange} />

          {renderSubmitButton()}
        </form>
      </div>
    </div>
  </section>
)

const renderHeader = ({ closeModal }: { closeModal: () => void }) => (
  <div className='flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600'>
    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
      Add Task
    </h3>
    <button
      type='button'
      className='inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white'
      data-modal-toggle='crud-modal'
      onClick={closeModal}
    >
      <svg
        className='w-3 h-3'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 14 14'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
        />
      </svg>
      <span className='sr-only'>Close modal</span>
    </button>
  </div>
)

const renderTaskName = (handleChange: (event: ChangeEvent) => void) => (
  <div className='col-span-2'>
    <label
      htmlFor='name'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    >
      Task name
    </label>
    <input
      type='text'
      name='name'
      id='name'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
      placeholder='Type product name'
      required={true}
      onChange={handleChange}
    />
  </div>
)

const renderSubmitButton = () => (
  <button
    type='submit'
    className='flex items-center justify-center w-full mt-5 button-first'
  >
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
    Create Task
  </button>
)
