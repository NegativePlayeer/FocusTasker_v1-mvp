import type { Task } from "@/types/task.ts";
import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useState} from "react";

interface TaskFormProps {
    task?: Task
    isOpen: boolean
    onClose: () => void
    onCreate: (title: string, description: string, priority: number) => void
}

function TaskForm({task, isOpen, onClose, onCreate}: TaskFormProps) {
    const [title, setTitle] = useState<string>(task?.title ?? '')
    const [description, setDescription] = useState<string>(task?.description ?? '')
    const [priority, setPriority] = useState<number>(task?.priority ?? 1)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-md bg-white dark:bg-slate-800'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onCreate(title, description, priority)
                    setTitle('')
                    setDescription('')
                    setPriority(1)
                }}>
                    <DialogHeader>
                        <DialogTitle className="text-lg text-slate-800 dark:text-slate-100">
                            {task ? 'Edit task' : 'New task'}
                        </DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {task ? 'Update your task details.' : 'Fill in the details below.'}
                        </p>
                    </DialogHeader>

                    <div className="py-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="title-1" className="text-sm text-slate-600 dark:text-slate-300">Title</Label>
                            <Input
                                id='title-1'
                                value={title}
                                placeholder="Task title..."
                                className="h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="description-1" className="text-sm text-slate-600 dark:text-slate-300">Description</Label>
                            <Input
                                id='description-1'
                                value={description}
                                placeholder="What needs to be done?"
                                className="h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm text-slate-600 dark:text-slate-300">Priority</Label>
                            <Select onValueChange={(value) => setPriority(Number(value))} value={String(priority)}>
                                <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100">
                                    <SelectValue placeholder="Select priority"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">🔴 Do it now!</SelectItem>
                                    <SelectItem value="2">🟡 Normal</SelectItem>
                                    <SelectItem value="3">🟢 Someday</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline' className="rounded-xl border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancel</Button>
                        </DialogClose>
                        <Button type='submit' className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default TaskForm
