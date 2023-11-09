type UserProjects = string[]

function getUserProjects(): UserProjects {
  return [
    'Project 1 Project 1Project 1Project 1Project 1',
    'Project 2',
    'Project 3',
  ]
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const ProjectsList = ({
  handleChange,
}: {
  handleChange: (event: ChangeEvent) => void
}) => {
  const userProjects = getUserProjects()

  return (
    <div className='mt-5 ml-2 w-44'>
      <label
        htmlFor='category'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        Project
      </label>
      <select
        onSelect={e => handleChange(e as unknown as ChangeEvent)}
        id='category'
        className='w-44 text-ellipsis overflow-hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        {userProjects.map(project => (
          <option value={project}>{project}</option>
        ))}
      </select>
    </div>
  )
}
