import { invoke } from '@tauri-apps/api'
import { IProject } from '../../interfaces/IProject'
import { Dropdown, DropdownOption } from '../Dropdown/Dropdown'
import { PenIcon, TrashIcon } from '../../assets/icons'
import trashSound from '../../assets/sounds/trash.mp3'
import { useModal } from '../../modals/ModalsContext'
import { useEffect } from 'react'

export const Project = ({
  project,
  forceProjectsFetchUpdate,
}: {
  project: IProject
  forceProjectsFetchUpdate: () => void
}) => {
  const { openModal, MODALS, modals } = useModal()
  const { name, description, color, id } = project

  useEffect(() => {
    console.log('useEffect Project', modals)
    if (
      modals[MODALS.ADD_PROJECT_MODAL] === false ||
      modals[MODALS.EDIT_PROJECT_MODAL] === false
    ) {
      forceProjectsFetchUpdate()
    }
  }, [modals[MODALS.EDIT_PROJECT_MODAL], modals[MODALS.ADD_PROJECT_MODAL]])

  const editProject = () => {
    openModal(MODALS.EDIT_PROJECT_MODAL, project)
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
      className='relative w-full p-6 mb-3 bg-white border border-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
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
        <p className='mb-3 overflow-hidden font-normal text-gray-500 break-words dark:text-gray-400 overflow-wrap'>
          {description}
        </p>
      </div>
    </div>
  )
}
