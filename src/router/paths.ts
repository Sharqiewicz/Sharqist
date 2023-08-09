export enum PATHS {
  DASHBOARD = 'dashboard',
  DEFAULT = '',
  INBOX = 'inbox',
}

export type PathKeys = (typeof PATHS)[keyof typeof PATHS]
