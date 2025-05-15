'use client'

import { createContext, useEffect, useState, ReactNode } from 'react'

export interface NewTask {
  id: number
  description: string
  done: boolean
}

interface TaskContextType {
  tasks: NewTask[]
  setTasks: React.Dispatch<React.SetStateAction<NewTask[]>>
}

export const TaskContext = createContext({} as TaskContextType)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<NewTask[]>([])

  // Carrega do localStorage no client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) setTasks(JSON.parse(storedTasks))
    }
  }, [])

  // Salva no localStorage quando tarefas mudam
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  )
}
