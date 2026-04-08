import type { Task } from "@/types/task.ts"
import { motion } from "framer-motion"
import { Spinner } from "@/components/ui/spinner"

interface TaskCardProps {
    task: Task
    onClick: () => void
    onDelete: (taskId: number) => void
    onDecompose: (taskId: number) => void
    isDecomposing: boolean
}

const priorityBorder: Record<number, string> = {
    1: 'border-l-red-500',
    2: 'border-l-amber-400',
    3: 'border-l-slate-300',
}

const priorityLabel: Record<number, string> = {
    1: '🔴 Do it now!',
    2: '🟡 Normal',
    3: '🟢 Someday',
}

function TaskCard({ task, onClick, onDelete, onDecompose, isDecomposing }: TaskCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: .98 }}
            onClick={onClick}
            className={`flex flex-col justify-between bg-card border border-border border-l-4 ${priorityBorder[task.priority]} rounded-xl p-4 cursor-pointer shadow-sm transition-opacity ${task.is_completed ? 'opacity-50' : ''}`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <h3 className={`font-semibold text-base mb-1 ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{task.description}</p>
                    <span className="text-xs mt-2 inline-block">{priorityLabel[task.priority]}</span>
                    {task.subtasks.length > 0 && (
                        <span className="text-xs text-muted-foreground mt-1 block">
                            {task.subtasks.filter(s => s.is_completed).length}/{task.subtasks.length} subtasks
                        </span>
                    )}
                </div>
                {task.is_completed && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDelete(task.id)
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer text-lg leading-none"
                    >
                        ×
                    </button>
                )}
            </div>
           <div className="flex justify-end mt-2">
               <button
                   onClick={(e) => {
                       e.stopPropagation()
                       onDecompose(task.id)
                   }}
                   className="text-xs border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-md px-2 py-1"
                   disabled={task.is_completed}
               >
                   {isDecomposing ? <span><Spinner /> decomposing... </span> : <p>decompose</p>}
               </button>
           </div>
        </motion.div>
    )
}

export default TaskCard
