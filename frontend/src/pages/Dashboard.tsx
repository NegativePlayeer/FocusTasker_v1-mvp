import {useEffect, useState} from "react";
import type { Task } from '@/types/task.ts'
import  TaskModal  from '@/components/tasks/TaskModal.tsx'
import {Button} from "@/components/ui/button.tsx";
import TaskForm from "@/components/tasks/TaskForm.tsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@/hooks/useTheme.ts'
import Navbar from "@/components/layout/Navbar.tsx";
import {motion} from "framer-motion";
import TaskCard from "@/components/tasks/TaskCard.tsx";

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
    const { isDark, toggle } = useTheme()
    const navigate = useNavigate()


    const fetchTasks = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/tasks/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            const data = await response.json()
            setTasks(data)
        }
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

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        void fetchTasks()
    }, [])

    return (
        <div className='min-h-screen bg-background'>
            <Navbar isDark={isDark} onToggleTheme={toggle} onLogout={handleLogout}/>
            <main className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-foreground!">My tasks</h1>
                    <Button onClick={() => setIsOpen(true)}>New task</Button>
                </div>
                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} onClick={() => {
                        setSelectedTask(task)
                        setIsTaskModalOpen(true)
                        }} />
                    ))}
                </motion.div>
            </main>
            <TaskForm isOpen={isOpen} onClose={() => setIsOpen(false)} onCreate={handleTaskCreating}/>
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
                    key={`${taskToEdit.id}-${isEditOpen}`}
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
