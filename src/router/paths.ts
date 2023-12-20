export enum PATHS {
  DEFAULT = '/',
  DASHBOARD = 'dashboard',
  INBOX = 'inbox',
  TODAY = 'today',
  ADD_TASK = 'add-task',
  HISTORY = 'history',
  UPCOMING = 'upcoming',
  PROJECTS_LIST = 'projects-list',
  CLEAN_CODE = 'clean-code',
  DESIGN_PATTERNS = 'design-patterns',
}

export type PathKeys = (typeof PATHS)[keyof typeof PATHS]
