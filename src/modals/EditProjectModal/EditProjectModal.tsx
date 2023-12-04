import { createPortal } from 'react-dom'
import { invoke } from '@tauri-apps/api'

import { ProjectModal } from '../ProjectModal/ProjectModal'
import { useProjectFormReducer } from '../ProjectModal/useProjectFormReducer'
import { useModal } from '../ModalsContext'
import { INewProject } from '../../interfaces/IProject'

export const EditProjectModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const { modalOptions } = useModal()

  const { handleProjectFormChange, projectFormData } = useProjectFormReducer(
    modalOptions as INewProject,
  )

  if (!modalOptions) return null

  const onSubmit = async (e: any) => {
    e.preventDefault()

    await invoke('edit_project', {
      name: projectFormData.name,
      description: projectFormData.description || '',
      color: projectFormData.color,
      id: modalOptions.id,
    })
  }

  if (!isOpen) return null

  return createPortal(
    <ProjectModal
      isOpen={isOpen}
      closeModal={closeModal}
      onSubmit={onSubmit}
      handleProjectFormChange={handleProjectFormChange}
      projectFormData={projectFormData}
      texts={{
        title: 'Edit project',
        button: 'Edit project',
      }}
    />,
    document.getElementById('root') || document.body,
  )
}
