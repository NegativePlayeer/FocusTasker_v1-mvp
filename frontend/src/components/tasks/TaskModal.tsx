import type {Task} from '@/types/task'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx"
import {useState} from "react"
import {Input} from "@/components/ui/input.tsx"

interface TaskModalProps {
    task: Task
    isOpen: boolean
    onClose: () => void
    onDelete: (taskId: number) => void
    onEdit: (task: Task) => void
    onComplete: (taskId: number, is_completed: boolean) => void
    onAddSubtask: (taskId: number, title: string) => void
    onCompleteSubtask: (taskId: number, subtaskId: number, is_completed: boolean) => void
}

const priorityConfig: Record<number, { label: string, className: string }> = {
    1: { label: '🔴 Do it now!', className: 'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-200 dark:border-red-800' },
    2: { label: '🟡 Normal', className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 border-amber-200 dark:border-amber-800' },
    3: { label: '🟢 Someday', className: 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700' },
}

function TaskModal({task, isOpen, onClose, onDelete, onEdit, onComplete, onAddSubtask, onCompleteSubtask}: TaskModalProps) {
    const [newSubtask, setNewSubtask] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false)

    const handleAddSubtask = () => {
        if (!newSubtask.trim()) return
        onAddSubtask(task.id, newSubtask)
        setNewSubtask('')
        setShowInput(false)
    }

    const completedCount = task.subtasks.filter(s => s.is_completed).length

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md dark:bg-slate-900">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={task.is_completed}
                            onChange={(e) => onComplete(task.id, e.target.checked)}
                            className="w-4 h-4 cursor-pointer accent-emerald-500 shrink-0"
                        />
                        <DialogTitle className={`text-lg text-slate-800 dark:text-slate-100 ${task.is_completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                            {task.title}
                        </DialogTitle>
                    </div>
                    {task.description && (
                        <p className="text-sm text-slate-400 dark:text-slate-500 ml-7">{task.description}</p>
                    )}
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <span className={`self-start px-2.5 py-1 rounded-lg text-xs font-medium border ${priorityConfig[task.priority].className}`}>
                        {priorityConfig[task.priority].label}
                    </span>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Subtasks
                            {task.subtasks.length > 0 && (
                                <span className="ml-1.5 text-slate-400 dark:text-slate-500 font-normal">
                                    {completedCount}/{task.subtasks.length}
                                </span>
                            )}
                        </p>

                        <div className="flex flex-col gap-1.5">
                            {task.subtasks.map(subtask => (
                                <div key={subtask.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                    <input
                                        type="checkbox"
                                        checked={subtask.is_completed}
                                        onChange={(e) => onCompleteSubtask(task.id, subtask.id, e.target.checked)}
                                        className="w-4 h-4 cursor-pointer accent-emerald-500 shrink-0"
                                    />
                                    <span className={`text-sm ${subtask.is_completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {subtask.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {showInput ? (
                            <div className="flex gap-2 mt-1">
                                <Input
                                    value={newSubtask}
                                    onChange={(e) => setNewSubtask(e.target.value)}
                                    placeholder="Subtask title..."
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                                    className="h-9 rounded-lg"
                                    autoFocus
                                />
                                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg" onClick={handleAddSubtask}>Add</Button>
                                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => setShowInput(false)}>Cancel</Button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowInput(true)}
                                className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-left cursor-pointer transition-colors mt-1"
                            >
                                + Add subtask
                            </button>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    {!task.is_completed && (
                        <Button variant='destructive' className="rounded-lg" onClick={() => onDelete(task.id)}>Delete</Button>
                    )}
                    <Button variant='outline' className="rounded-lg border-slate-200 dark:border-slate-700" onClick={() => onEdit(task)}>Edit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TaskModal
