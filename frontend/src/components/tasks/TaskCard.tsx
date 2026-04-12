import type { Task } from "@/types/task.ts"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"

interface TaskCardProps {
    task: Task
    onClick: () => void
    onDelete: (taskId: number) => void
    onDecompose: (taskId: number) => void
    decomposingTaskId: number | null
}

const priorityBorder: Record<number, string> = {
    1: 'border-l-red-400',
    2: 'border-l-amber-400',
    3: 'border-l-slate-300 dark:border-l-slate-600',
}

const priorityLabel: Record<number, string> = {
    1: '🔴 Do it now!',
    2: '🟡 Normal',
    3: '🟢 Someday',
}

function TaskCard({ task, onClick, onDelete, onDecompose, decomposingTaskId }: TaskCardProps) {
    const completedSubtasks = task.subtasks.filter(s => s.is_completed).length

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: .98 }}
            onClick={onClick}
            className={`flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 border-l-4 ${priorityBorder[task.priority]} rounded-xl p-5 cursor-pointer shadow-sm transition-opacity ${task.is_completed ? 'opacity-50' : ''}`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <p className={`font-semibold text-base mb-1 ${task.is_completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                        {task.title}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm line-clamp-2">{task.description}</p>
                    <span className="text-xs mt-2 inline-block text-slate-500 dark:text-slate-400">{priorityLabel[task.priority]}</span>
                    {task.subtasks.length > 0 && (
                        <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block">
                            {completedSubtasks}/{task.subtasks.length} subtasks
                        </span>
                    )}
                </div>
                {task.is_completed && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
                        className="text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors cursor-pointer text-lg leading-none"
                    >
                        ×
                    </button>
                )}
            </div>
            <div className="flex justify-end mt-3">
                <button
                    onClick={(e) => { e.stopPropagation(); onDecompose(task.id) }}
                    className="text-xs border border-emerald-400 text-emerald-500 hover:bg-emerald-500 hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-lg px-3 py-1"
                    disabled={task.is_completed || decomposingTaskId === task.id}
                >
                    {decomposingTaskId === task.id
                        ? <span className='flex items-center gap-1.5'><Spinner /> Decomposing...</span>
                        : 'Decompose'
                    }
                </button>
            </div>
        </motion.div>
    )
}

export default TaskCard
