import { TaskContext } from '@/context/TaskContext'
import { Check, ClipboardList, Trash2 } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Task() {
  const { setTasks, tasks } = useContext(TaskContext)

  function handleComplete(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: true } : task,
    )

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    setTasks(storedTasks)
  }, [setTasks])

  function handleDelete(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id)

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  return (
    <>
      {tasks.length > 0 ? (
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {tasks.map((task) => {
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  layout
                  className="flex items-start gap-3 rounded-lg border border-gray-400 bg-gray-500 p-4"
                >
                  {task.done ? (
                    <div className="bg-purpledark hover:bg-purple flex h-4 w-4 items-center justify-center rounded-full p-1 outline-none">
                      <Check className="h-2 w-2 text-gray-100" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleComplete(task.id)}
                      type="button"
                      className="border-blue hover:border-bluedark hover:bg-bluedark/20 h-4 w-4 rounded-full border-2 bg-none transition-colors duration-300"
                    />
                  )}

                  <span
                    className={`flex-1 truncate text-sm/4 ${
                      task.done ? 'text-gray-300 line-through' : 'text-gray-100'
                    }`}
                  >
                    {task.description}
                  </span>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="group rounded p-1 transition-colors duration-300 hover:bg-gray-400"
                  >
                    <Trash2 className="h-3.5 w-3 text-gray-300 group-hover:text-red-500" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4 rounded-t-lg border-t border-gray-400 px-6 py-16"
        >
          <ClipboardList className="h-14 w-14 text-gray-400" />
          <div className="flex flex-col items-center leading-snug">
            <p className="text-base font-bold text-gray-300">
              You do not have any registered tasks yet.
            </p>

            <span className="font-normal text-gray-300">
              Create tasks and organize your to-do items
            </span>
          </div>
        </motion.div>
      )}
    </>
  )
}
