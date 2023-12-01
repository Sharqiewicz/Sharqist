import React, { ChangeEvent, FormEventHandler } from 'react'
import { ColorPicker } from '../ColorPicker/ColorPicker'
import { Description } from './Description'
import { TextInput } from './TextInput'
import { ButtonPrimary } from '../Button/ButtonPrimary'
import { INewProject } from '../../interfaces/IProject'

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

type ProjectFormProps = {
  projectFormData: INewProject
  handleChange: (event: ChangeEvent) => void
  handleSubmit: FormEventHandler<HTMLFormElement>
  buttonText: string
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  projectFormData,
  handleChange,
  handleSubmit,
  buttonText,
}) => (
  <form className='p-4 md:p-5' onSubmit={handleSubmit}>
    <TextInput handleChange={handleChange} value={projectFormData.name} />
    <ColorPicker color={projectFormData.color} handleChange={handleChange} />
    <Description
      handleChange={handleChange}
      value={projectFormData.description}
    />
    <ButtonPrimary {...{ text: buttonText, svg: <ButtonSVG /> }} />
  </form>
)
