import React, { createContext, useContext } from 'react'

interface DevModeContextType {
  isDevMode: boolean
  enableDevMode: () => void
  disableDevMode: () => void
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined)

export const useDevMode = () => {
  const context = useContext(DevModeContext)
  if (!context) {
    throw new Error('useDevMode must be used within a DevModeProvider')
  }
  return context
}

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDevMode = import.meta.env.DEV // Automatically true in development

  const enableDevMode = () => {
    // In dev mode, we can enable additional features
    console.log('🚀 Development mode enabled')
  }

  const disableDevMode = () => {
    console.log('🔒 Production mode')
  }

  const value: DevModeContextType = {
    isDevMode,
    enableDevMode,
    disableDevMode,
  }

  return (
    <DevModeContext.Provider value={value}>
      {children}
    </DevModeContext.Provider>
  )
}
