import { invoke } from '@tauri-apps/api'
import { IProject } from '../../interfaces/IProject'
import { Dropdown, DropdownOption } from '../Dropdown/Dropdown'
import { PenIcon, TrashIcon } from '../../assets/icons'
import trashSound from '../../assets/sounds/trash.mp3'

export const Project = ({
  project,
  forceProjectsFetchUpdate,
}: {
  project: IProject
  forceProjectsFetchUpdate: () => void
}) => {
  const { name, description, color, id } = project

  const editProject = () => {
    // openModal(MODALS.EDIT_PROJECT_MODAL, project)
  }

  const deleteProject = async () => {
    const audio = new Audio(trashSound)
    audio.play()

    await invoke('delete_project', { id })
    forceProjectsFetchUpdate()
  }

  const dropdownOptions: DropdownOption[] = [
    {
      name: 'Edit',
      icon: PenIcon,
      onClick: editProject,
    },
    {
      name: 'Delete',
      icon: TrashIcon,
      onClick: deleteProject,
    },
  ]

  return (
    <div
      className='relative w-full p-6 mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
      style={{ backgroundColor: color }}
    >
      <Dropdown
        options={dropdownOptions}
        additionalStyles='absolute right-4 top-4 flex justify-end flex-col items-end cursor-pointer'
      />
      <div className='ml-5'>
        <h1 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          {name}
        </h1>
        <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </div>
  )
}
