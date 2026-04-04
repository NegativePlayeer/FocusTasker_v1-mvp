import {useEffect, useState} from "react";
import type { Task } from '@/types/task.ts'
import  TaskModal  from '@/components/tasks/TaskModal.tsx'
import {Button} from "@/components/ui/button.tsx";
import TaskForm from "@/components/tasks/TaskForm.tsx";

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
    const listTasks = tasks.map(task => <li className='cursor-pointer' key={task.id} onClick={() => {
        setSelectedTask(task);
        setIsTaskModalOpen(true)
    }}>
        {task.title}
        {/*<Button variant='destructive' className='cursor-pointer' onClick={() => handleDeleteTask(task.id)}>Delete</Button>*/}
        {/*<Button variant='secondary' className='cursor-pointer' onClick={() => handleTaskEdit(task.id)}*/}
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

    const handleTaskCreating = async (title: string, description: string, priority: number) => {
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
            setIsTaskModalOpen(false)
        }
        else {
            console.log('Error')
        }
    }

    const handleOpenEdit = (task: Task) => {
        setIsTaskModalOpen(false)
        setTaskToEdit(task)
        setIsEditOpen(true)
    }

    const handleTaskEdit = async(title: string, description: string, priority: number) => {
        if(!taskToEdit) return

        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/tasks/${taskToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title, description, priority})
        })

        if(response.ok){
            setIsEditOpen(false)
            await fetchTasks()
        }
    }

    useEffect(() => {
        void fetchTasks()
    }, [])

    return (
        <div>
            <ul>{listTasks}</ul>
            <Button onClick={()=>setIsOpen(true)} className='cursor-pointer'>Create a new task</Button>
            <TaskForm isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleTaskCreating} />
            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                    onDelete={handleDeleteTask}
                    onEdit={handleOpenEdit}
                />
            )}

            {taskToEdit && (
                <TaskForm
                    key={taskToEdit.id}
                    task={taskToEdit}
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    onCreate={handleTaskEdit}
                />
            )}

        </div>
    )
}

export default Dashboard