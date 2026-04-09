import type { Task } from "@/types/task.ts";
import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
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

function TaskForm({task, isOpen, onClose, onCreate}:TaskFormProps){
    const [title, setTitle] = useState<string>(task?.title ?? '')
    const [description, setDescription] = useState<string>(task?.description ?? '')
    const [priority, setPriority] = useState<number>(task?.priority ?? 1)


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-md'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onCreate(title, description, priority)
                    setTitle('')
                    setDescription('')
                    setPriority(1)
                }}>
                    <DialogHeader>
                        <DialogTitle className="text-xl text-foreground!">{task ? 'Edit task' : 'New task'}</DialogTitle>
                        <DialogDescription>
                            {task ? 'Update your task details.' : 'Fill in the details below.'}
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup className="py-4 flex flex-col gap-4">
                        <Field>
                            <Label htmlFor="title-1" className="font-medium">Title</Label>
                            <Input
                                id='title-1'
                                name='title'
                                value={title}
                                placeholder="Task title..."
                                className="mt-1"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="description-1" className="font-medium">Description</Label>
                            <Input
                                id='description-1'
                                name='description'
                                value={description}
                                placeholder="What needs to be done?"
                                className="mt-1"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Label className="font-medium">Priority</Label>
                            <Select onValueChange={(value) => setPriority(Number(value))} value={String(priority)}
                                    required>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select priority"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">🔴 Do it now!</SelectItem>
                                    <SelectItem value="2">🟡 Normal</SelectItem>
                                    <SelectItem value="3">🟢 Someday</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button type='submit'>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default TaskForm