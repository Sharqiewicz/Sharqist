import { createPortal } from 'react-dom'
import { FormEvent, FormEventHandler, useReducer, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const AddTaskModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const [startDate, setStartDate] = useState(new Date())

  const [formData, setFormData] = useReducer(formReducer, {})

  const handleChange = (event: ChangeEvent) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formData)
  }

  return isOpen ? (
    createPortal(
      renderTaskModal({
        isOpen,
        closeModal,
        startDate,
        setStartDate,
        handleChange,
        onSubmit,
      }),
      document.getElementById('root') || document.body,
    )
  ) : (
    <></>
  )
}

interface RenderTaskModalProps {
  isOpen: boolean
  closeModal: () => void
  startDate: Date
  setStartDate: React.Dispatch<React.SetStateAction<Date>>
  handleChange: (event: ChangeEvent) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

const renderTaskModal = ({
  isOpen,
  closeModal,
  startDate,
  setStartDate,
  handleChange,
  onSubmit,
}: RenderTaskModalProps) => (
  <section
    id='crud-modal'
    tabIndex={-1}
    aria-hidden={!isOpen}
    className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'
  >
    <div className='relative w-full max-w-md max-h-full p-4'>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
        {renderHeader({ closeModal })}
        <form className='p-4 md:p-5' onSubmit={onSubmit}>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            {renderTaskName(handleChange)}
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date as Date)}
            />
            {renderCategory(handleChange)}
            {renderDescription(handleChange)}
          </div>
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
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
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

const renderCategory = (handleChange: (event: ChangeEvent) => void) => (
  <div className='col-span-2 sm:col-span-1'>
    <label
      htmlFor='category'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    >
      Category
    </label>
    <select
      onSelect={e => handleChange(e as unknown as ChangeEvent)}
      id='category'
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
    >
      <option selected={true}>Select category</option>
      <option value='TV'>TV/Monitors</option>
      <option value='PC'>PC</option>
      <option value='GA'>Gaming/Console</option>
      <option value='PH'>Phones</option>
    </select>
  </div>
)

const renderDescription = (handleChange: (event: ChangeEvent) => void) => (
  <div className='col-span-2'>
    <label
      htmlFor='description'
      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
    >
      Description
    </label>
    <textarea
      onChange={e => handleChange(e as unknown as ChangeEvent)}
      id='description'
      rows={4}
      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      placeholder='Write product description here'
    ></textarea>
  </div>
)

const renderSubmitButton = () => (
  <button
    type='submit'
    className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
  >
    <svg
      className='w-5 h-5 me-1 -ms-1'
      fill='currentColor'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
        clip-rule='evenodd'
      ></path>
    </svg>
    Create Task
  </button>
)
