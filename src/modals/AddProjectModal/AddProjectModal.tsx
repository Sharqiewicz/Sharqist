import { createPortal } from 'react-dom'
import { invoke } from '@tauri-apps/api'

import { ProjectModal } from '../ProjectModal/ProjectModal'
import { useProjectFormReducer } from '../ProjectModal/useProjectFormReducer'

export const AddProjectModal: React.FC<{
  isOpen: boolean
  closeModal: () => void
}> = ({ isOpen, closeModal }) => {
  const { handleProjectFormChange, projectFormData } = useProjectFormReducer()

  const onSubmit = async (e: any) => {
    e.preventDefault()

    await invoke('add_project', {
      name: projectFormData.name,
      description: projectFormData.description || '',
      color: projectFormData.color,
    })

    closeModal()
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
        title: 'Add project',
        button: 'Add project',
      }}
    />,
    document.getElementById('root') || document.body,
  )
}
