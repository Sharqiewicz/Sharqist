import { useFetchProjects } from '../../hooks/useFetchProjects'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const ProjectsList = ({
  value,
  handleChange,
}: {
  value?: number
  handleChange: (event: ChangeEvent) => void
}) => {
  const { projects } = useFetchProjects()

  return (
    <div className='mt-5 ml-2 w-44'>
      <label
        htmlFor='project_id'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Project
      </label>
      <select
        value={value}
        onChange={e => handleChange(e as unknown as ChangeEvent)}
        id='project_id'
        name='project_id'
        className='w-44 text-ellipsis overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option key='none'>None</option>
        {projects.map(project => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  )
}
