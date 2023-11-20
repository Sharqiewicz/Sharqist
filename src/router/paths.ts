export enum PATHS {
  DEFAULT = '/',
  DASHBOARD = 'dashboard',
  INBOX = 'inbox',
  TODAY = 'today',
  ADD_TASK = 'add-task',
  HISTORY = 'history',
  UPCOMING = 'upcoming',
  PROJECTS_LIST = 'projects-list',
}

export type PathKeys = (typeof PATHS)[keyof typeof PATHS]
