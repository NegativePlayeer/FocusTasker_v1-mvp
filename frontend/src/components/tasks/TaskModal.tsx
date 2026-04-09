import type {Task} from '@/types/task'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx"
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

const priorityLabel: Record<number, string> = {
    1: '🔴 Do it now!',
    2: '🟡 Normal',
    3: '🟢 Someday',
}

function TaskModal({
                       task,
                       isOpen,
                       onClose,
                       onDelete,
                       onEdit,
                       onComplete,
                       onAddSubtask,
                       onCompleteSubtask
                   }: TaskModalProps) {
    const [newSubtask, setNewSubtask] = useState<string>('')
    const [showInput, setShowInput] = useState<boolean>(false)

    const handleAddSubtask = () => {
        if (!newSubtask.trim()) return
        onAddSubtask(task.id, newSubtask)
        setNewSubtask('')
        setShowInput(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={task.is_completed}
                            onChange={(e) => onComplete(task.id, e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                        />
                        <DialogTitle
                            className={`text-xl text-foreground! ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                        </DialogTitle>
                    </div>
                    <DialogDescription>{task.description}</DialogDescription>
                </DialogHeader>

                <div className="py-2 flex flex-col gap-3">
                    <span className="text-sm font-medium">{priorityLabel[task.priority]}</span>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Subtasks {task.subtasks.length > 0 && `(${task.subtasks.filter(s => s.is_completed).length}/${task.subtasks.length})`}</p>
                        {task.subtasks.map(subtask => (
                            <div key={subtask.id} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={subtask.is_completed}
                                    onChange={(e) => onCompleteSubtask(task.id, subtask.id, e.target.checked)}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <span className={subtask.is_completed ? 'line-through text-muted-foreground' : ''}>
                                    {subtask.title}
                                </span>
                            </div>
                        ))}

                        {showInput ? (
                            <div className="flex gap-2 mt-1">
                                <Input
                                    value={newSubtask}
                                    onChange={(e) => setNewSubtask(e.target.value)}
                                    placeholder="Subtask title..."
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubtask()}
                                    autoFocus
                                />
                                <Button size="sm" onClick={handleAddSubtask}>Add</Button>
                                <Button size="sm" variant="outline" onClick={() => setShowInput(false)}>Cancel</Button>
                            </div>
                        ) : (
                            <button onClick={() => setShowInput(true)}
                                    className="text-sm text-muted-foreground hover:text-foreground text-left cursor-pointer">
                                + Add subtask
                            </button>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    {!task.is_completed && (
                        <Button variant='destructive' onClick={() => onDelete(task.id)}>Delete</Button>
                    )}
                    <Button variant='outline' onClick={() => onEdit(task)}>Edit</Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default TaskModal