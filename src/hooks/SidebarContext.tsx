import { createContext, useContext, ReactNode, useState, FC } from 'react'

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useModal must be used within a SidebarProvider')
  }
  return context
}

interface SidebarContextProps {
  isSidebarOpen: boolean
  openSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

interface SidebarProviderProps {
  children: ReactNode
}

const SidebarProvider: FC<SidebarProviderProps> = ({
  children,
}: SidebarProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export { SidebarProvider, useSidebar }
