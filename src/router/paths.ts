export enum PATHS {
  DASHBOARD = 'dashboard',
  DEFAULT = '',
  INBOX = 'inbox',
  TODAY = 'today',
  ADD_TASK = 'add-task',
}

export type PathKeys = (typeof PATHS)[keyof typeof PATHS]
