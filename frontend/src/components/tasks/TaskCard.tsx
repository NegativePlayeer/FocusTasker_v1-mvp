import type { Task } from "@/types/task.ts";
import { motion } from "framer-motion";

interface TaskCardProps {
    task: Task,
    onClick: () => void
}

const priorityLabel: Record<number, string> = {
    1: 'Do it right now!',
    2: 'Eye catching, but...',
    3: 'Well... Do it later'
}

const priorityBorder: Record<number, string> = {
    1: 'border-l-red-500',
    2: 'border-l-amber-400',
    3: 'border-l-slate-300',
}

function TaskCard({task, onClick}: TaskCardProps) {

    return (
        <motion.div
            whileHover={{scale: 1.02}}
            whileTap={{scale:.98}}
            onClick={onClick}
            className={`bg-card border border-border border-l-4 ${priorityBorder[task.priority]} rounded-xl p-4 cursor-pointer shadow-sm`}
        >
            <h3 className="font-semibold text-foreground text-base mb-1">{task.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{task.description}</p>
            <span className="text-xs mt-2 inline-block">{priorityLabel[task.priority]}</span>
        </motion.div>
    )
}

export default TaskCard