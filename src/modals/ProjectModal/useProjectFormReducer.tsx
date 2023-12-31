import { useEffect, useReducer } from 'react'

import { ChangeEvent } from '../ProjectModal/ProjectModal'
import { INewProject } from '../../interfaces/IProject'

type ProjectFormState = INewProject

type ProjectFormAction = {
  name: string
  value: string | number | boolean
}

export const useProjectFormReducer = (initialValue?: INewProject) => {
  const projectFormReducer = (
    state: ProjectFormState,
    event: ProjectFormAction,
  ) => {
    return {
      ...state,
      [event.name]: event.value,
    }
  }

  const baseInitalValue: INewProject = {
    description: '',
    name: '',
    color: '#a5aadf',
  }

  const [projectFormData, setProjectFormData] = useReducer(
    projectFormReducer,
    baseInitalValue,
  )

  const handleProjectFormChange = (event: ChangeEvent) => {
    setProjectFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  useEffect(() => {
    if (initialValue) {
      for (const [key, value] of Object.entries(initialValue)) {
        setProjectFormData({ name: key, value })
      }
    }
  }, [initialValue])

  return { projectFormData, handleProjectFormChange }
}
