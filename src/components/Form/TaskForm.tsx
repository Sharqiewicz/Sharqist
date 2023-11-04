// TaskForm.tsx
import React, { ChangeEvent, FormEventHandler } from 'react'
import { DatePicker } from '../../components/Form/DatePicker'
import { Description } from '../../components/Form/Description'
import { ProjectsList } from '../../components/Form/ProjectsList'
import { TextInput } from '../../components/Form/TextInput'
import { ButtonPrimary } from '../../components/Button/ButtonPrimary'

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

type TaskFormProps = {
  initialValues: FormState
  handleChange: (event: ChangeEvent) => void
  handleSubmit: FormEventHandler<HTMLFormElement>
  setDate: (date: Date) => void
  date: Date
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  handleChange,
  handleSubmit,
  date,
  setDate,
}) => (
  <form className='p-4 md:p-5' onSubmit={handleSubmit}>
    <TextInput handleChange={handleChange} initialValue={initialValues.name} />
    <div className='flex items-center justify-between'>
      <DatePicker date={date} setDate={setDate} />
      <ProjectsList handleChange={handleChange} />
    </div>
    <Description
      handleChange={handleChange}
      initialValue={initialValues.description}
    />
    <ButtonPrimary {...{ text: 'Create Task', svg: <ButtonSVG /> }} />
  </form>
)
