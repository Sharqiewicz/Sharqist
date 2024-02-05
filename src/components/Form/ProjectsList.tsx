import { useState } from 'react'
import { useFetchProjects } from '../../hooks/useFetchProjects'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const ProjectsList = ({
  value = -1,
  handleChange,
}: {
  value?: number
  handleChange: (event: ChangeEvent) => void
}) => {
  const { projects } = useFetchProjects()

  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (id: number) => {
    handleChange({
      target: { name: 'project_id', value: id },
    } as unknown as ChangeEvent)
    setIsOpen(false)
  }

  const currentProjectName =
    projects.find(project => project.id === value)?.name || 'None'

  return (
    <div className='mt-5 ml-2 overflow-hidden w-44'>
      <label
        htmlFor='project_id'
        className='mb-2 text-sm font-medium text-white'
      >
        Project
      </label>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          id='project_id'
          name='project_id'
          type='button'
          className='whitespace-nowrap text-ellipsis border border-gray-300 text-sm rounded-lg text-start focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
          aria-haspopup='listbox'
        >
          {currentProjectName}
        </button>
        {isOpen && (
          <ul
            role='listbox'
            className='absolute border w-full border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
          >
            <li className='py-2 text-start'>
              <button onClick={() => handleSelect(-1)}>None</button>
            </li>
            {projects.map(project => (
              <li key={project.id} className='py-2 text-start'>
                <button onClick={() => handleSelect(project.id)}>
                  {project.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
