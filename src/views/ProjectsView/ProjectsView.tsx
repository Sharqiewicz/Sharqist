import { useModal } from '../../modals/ModalsContext'
import { ProjectList } from '../../components'
import { useFetchProjects } from '../../hooks/useFetchProjects'

function ProjectsView() {
  const { MODALS, openModal } = useModal()

  const { forceProjectsFetchUpdate, projects } = useFetchProjects()

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold text-gray-700'>Projects List</h1>
      <div className='row'></div>

      <ProjectList
        projects={projects}
        forceProjectsFetchUpdate={forceProjectsFetchUpdate}
      />

      <hr className='my-5' />

      <div className='flex justify-center w-full'>
        <button
          onClick={() => openModal(MODALS.ADD_PROJECT_MODAL)}
          type='button'
          className='button-first'
        >
          Add Project
        </button>
      </div>
    </>
  )
}

export { ProjectsView }
