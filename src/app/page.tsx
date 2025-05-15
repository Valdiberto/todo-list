'use client'

import { Logo } from '@/components/Logo'
import { Task } from '@/components/Task'
import { PlusCircle } from 'lucide-react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { TaskContext } from '@/context/TaskContext'

const TaskSchema = z.object({
  description: z.string().min(1, 'Campo obrigatório'),
})

type TaskSchemaInputs = z.infer<typeof TaskSchema>

export default function Home() {
  const { setTasks, tasks } = useContext(TaskContext)
  const tasksDone = tasks.filter((task) => task.done).length
  const { handleSubmit, register, reset } = useForm<TaskSchemaInputs>({
    resolver: zodResolver(TaskSchema),
  })

  function handleCreateTask(data: TaskSchemaInputs) {
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    const newTask = {
      id: Math.random(),
      description: data.description,
      done: false,
    }

    const updatedTasks = [...existingTasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    reset()
  }

  return (
    <div className="flex h-50 w-full flex-col items-center bg-gray-700 pt-18">
      <Logo />
      <div className="max-w-185">
        <form
          onSubmit={handleSubmit(handleCreateTask)}
          method="POST"
          className="mt-10 flex gap-2"
        >
          <div className="w-max-[638px] flex items-center rounded border border-gray-700 bg-gray-500 p-4 shadow-sm transition-colors duration-300 focus-within:border-violet-400 lg:w-[638px]">
            <input
              className="placeholder-text-gray-300 flex-1 border-0 bg-transparent p-0 text-gray-100 transition-colors duration-300 outline-none"
              type="text"
              placeholder="Adicione uma nova tarefa"
              required
              {...register('description')}
            />
          </div>

          <button
            type="submit"
            className="bg-bluedark hover:bg-blue flex items-center gap-2 rounded p-4 font-bold text-gray-100 transition-colors duration-300"
          >
            Criar
            <PlusCircle className="h-4 w-4 text-gray-100" />
          </button>
        </form>

        <div className="mt-16">
          <div className="mb-6 flex items-center justify-between text-sm font-bold">
            <div className="text-blue flex gap-2">
              Tarefas criadas{' '}
              <span className="rounded-full bg-gray-400 px-2 text-gray-200">
                {tasks.length}
              </span>
            </div>

            <div className="text-purple flex gap-2">
              Concluídas{' '}
              <span className="rounded-full bg-gray-400 px-2 text-gray-200">
                {tasksDone} de {tasks.length}
              </span>
            </div>
          </div>

          <Task />
        </div>
      </div>
    </div>
  )
}
