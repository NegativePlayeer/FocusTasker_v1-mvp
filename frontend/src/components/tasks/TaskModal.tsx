import type { Task } from '@/types/task'
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
// import {Field, FieldGroup} from "@/components/ui/field.tsx";
// import {Label} from "@/components/ui/label.tsx";
// import {Input} from "@/components/ui/input.tsx";
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";


interface TaskModalProps {
    task: Task
    isOpen: boolean
    onClose: () => void
    onDelete: (taskId: number) => void
    onEdit: (task: Task) => void
}

function TaskModal({task, isOpen, onClose, onDelete, onEdit}: TaskModalProps){
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                    <DialogDescription>{task.description}</DialogDescription>
                </DialogHeader>
                <p>Priority: {task.priority}</p>
                <DialogFooter>
                    <Button variant='destructive' className='cursor-pointer' onClick={()=> onDelete(task.id)}>Delete</Button>
                    <Button className='cursor-pointer' onClick={() => onEdit(task)}>Edit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default TaskModal