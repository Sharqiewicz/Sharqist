import { FC } from 'react'
import { IProject } from '../../interfaces/IProject'
import { Project } from '../Project/Project'

interface ProjectListProps {
  projects: IProject[]
  forceProjectsFetchUpdate: () => void
}

export const ProjectList: FC<ProjectListProps> = ({
  projects,
  forceProjectsFetchUpdate,
}: ProjectListProps) => {
  if (projects.length) {
    return (
      <>
        {projects.map(project => (
          <Project
            {...{ project, forceProjectsFetchUpdate }}
            key={project.id}
          />
        ))}
      </>
    )
  } else {
    return <p>No tasks to be displayed</p>
  }
}
