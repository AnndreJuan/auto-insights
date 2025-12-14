"use client"

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Users } from '../data/schema'

type UsersDialogType = 'create' | 'update' | 'delete' | 'import'

type UsersContextType = {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: Users | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Users | null>>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Users | null>(null)

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  )
}

export const useUsers = () => {
  const usersContext = React.useContext(UsersContext)

  if (!UsersContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return usersContext
}