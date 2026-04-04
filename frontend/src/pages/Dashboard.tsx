import React,{useEffect, useState} from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Field, FieldGroup} from "@/components/ui/field.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
    id: number
    title: string
    description: string
    priority: number
    is_completed: boolean
}


function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('Task title')
    const [description, setDescription] = useState<string>('A new task')
    const [priority, setPriority] = useState<number>(1)
    const listTasks = tasks.map(task => <li key={task.id}>
        {task.title}
        <Button variant='destructive' className='cursor-pointer' onClick={() => handleDeleteTask(task.id)}>Delete</Button>
        <Button variant='secondary' className='cursor-pointer' onClick={() => handleTaskEdit(task.id)}
    </li>)

    const fetchTasks = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/tasks/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        setTasks(data)
    }

    const handleTaskCreating = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/tasks/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title, description, priority})
        })
        if(response.ok){
            setIsOpen(false)
            await fetchTasks()
        }else{
            console.log('Error')
        }
    }

    const handleDeleteTask = async (taskId: number) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            await fetchTasks()
        }
        else {
            console.log('Error')
        }
    }

    const handleTaskEdit = async(taskId: number) => {
        const token = localStorage.getItem('token ')
    }

    useEffect(() => {
        void fetchTasks()
    }, [])

    return (
        <div>
            <ul>{listTasks}</ul>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger>
                        <Button variant='outline' className='cursor-pointer'>Create new task</Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-sm'>
                        <form onSubmit={handleTaskCreating}>
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
                                    <Label htmlFor="description-1">Title</Label>
                                    <Input
                                        id='description-1'
                                        name='description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Field>
                                <Field>
                                    <Select onValueChange={(value) => setPriority(Number(value))} required>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="1">1 - Do it as fast as possible!</SelectItem>
                                        <SelectItem value="2">2 - Do not waste to much time!</SelectItem>
                                        <SelectItem value="3">3 - Well, do it later</SelectItem>
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
        </div>
    )
}

export default Dashboard