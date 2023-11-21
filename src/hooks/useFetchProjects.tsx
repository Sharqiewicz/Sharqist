import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

import { IProject } from '../interfaces/IProject'

const useFetchProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([])

  const fetchProjects = async () => {
    const allProjects: IProject[] = await invoke('get_all_projects')

    setProjects(allProjects)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const forceProjectsFetchUpdate = async () => {
    await fetchProjects()
  }

  return { projects, forceProjectsFetchUpdate }
}

export { useFetchProjects }
