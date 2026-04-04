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
            <DialogContent className='sm:max-w-sm'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    onCreate(title, description, priority)
                    setTitle('')
                    setDescription('')
                    setPriority(2)
                }}>
                    <DialogHeader>
                        <DialogTitle>New task</DialogTitle>
                        <DialogDescription>
                            Create a new task :D
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title-1">Title</Label>
                            <Input
                                id='title-1'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="description-1">Description</Label>
                            <Input
                                id='description-1'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <Select onValueChange={(value) => setPriority(Number(value))} value={String(priority)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 - Do it as fast as possible!</SelectItem>
                                    <SelectItem value="2">2 - Do not waste too much time!</SelectItem>
                                    <SelectItem value="3">3 - Well, do it later...</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                        <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default TaskForm