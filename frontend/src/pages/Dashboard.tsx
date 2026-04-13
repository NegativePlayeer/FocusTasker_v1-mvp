import {useEffect, useState} from "react";
import type {Task, DecomposeStep} from '@/types/task.ts'
import TaskModal from '@/components/tasks/TaskModal.tsx'
import {Button} from "@/components/ui/button.tsx";
import TaskForm from "@/components/tasks/TaskForm.tsx";
import {useNavigate} from "react-router-dom";
import {useTheme} from '@/hooks/useTheme.ts'
import Navbar from "@/components/layout/Navbar.tsx";
import {motion} from "framer-motion";
import TaskCard from "@/components/tasks/TaskCard.tsx";
import DecomposeModal from "@/components/tasks/DecomposeModal.tsx";
import type {User} from "@/types/User.ts";
import UserProfileModal from "@/components/user/UserProfileModal.tsx";

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
    const [decomposedSteps, setDecomposedSteps] = useState<DecomposeStep[]>([])
    const [isDecomposedModal, setIsDecomposedModal] = useState<boolean>(false)
    const [taskToDecompose, setTaskToDecompose] = useState<number | null>(null)
    const [decomposingTaskId, setDecomposingTaskId] = useState<number | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [isUserProfileModal,setIsUserProfileModal] = useState<boolean>(false)
    const [filterPriority, setFilterPriority] = useState<number | null>(null)
    const [hideCompleted, setHideCompleted] = useState<boolean>(false)
    const {isDark, toggle} = useTheme()
    const navigate = useNavigate()

    const fetchTasks = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/tasks/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const data = await response.json()
            setTasks(data)
        }
    }

    const fetchUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            const data = await response.json()
            setUser(data)
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
        if (response.ok) {
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

        if (response.ok) {
            await fetchTasks()
            setIsTaskModalOpen(false)
        } else {
            console.log('Error')
        }
    }

    const handleOpenEdit = (task: Task) => {
        setIsTaskModalOpen(false)
        setTaskToEdit(task)
        setIsEditOpen(true)
    }

    const handleTaskEdit = async (title: string, description: string, priority: number) => {
        if (!taskToEdit) return

        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/tasks/${taskToEdit.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title, description, priority})
        })

        if (response.ok) {
            setIsEditOpen(false)
            await fetchTasks()
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleAddSubtask = async (taskId: number, title: string) => {
        const token = localStorage.getItem('token')
        await fetch(`http://localhost:8000/tasks/${taskId}/subtasks`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, 'Content-type': 'application/json'},
            body: JSON.stringify({title, is_completed: false})
        })
        await fetchTasks()
    }

    const handleCompleteSubtask = async (taskId: number, subtaskId: number, is_completed: boolean) => {
        const token = localStorage.getItem('token')
        await fetch(`http://localhost:8000/tasks/${taskId}/subtasks/${subtaskId}`, {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-type': 'application/json'},
            body: JSON.stringify({is_completed})
        })
        await fetchTasks()
    }

    const handleComplete = async (taskId: number, is_completed: boolean) => {
        const token = localStorage.getItem('token')
        await fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-type': 'application/json'},
            body: JSON.stringify({is_completed})
        })


        const task = tasks.find(t => t.id === taskId)
        if (task) {
            await Promise.all(task.subtasks.map(subtask =>
                fetch(`http://localhost:8000/tasks/${taskId}/subtasks/${subtask.id}`, {
                    method: 'PUT',
                    headers: {'Authorization': `Bearer ${token}`, 'Content-type': 'application/json'},
                    body: JSON.stringify({is_completed: is_completed})
                })
            ))
        }


        await fetchTasks()
    }

    const handleDecompose = async (taskId: number) => {
        setDecomposingTaskId(taskId)
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/ai/decompose/${taskId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            setDecomposedSteps(data)
            setIsDecomposedModal(true)
            setTaskToDecompose(taskId)
        }
        setDecomposingTaskId(null)
    }

    const handleAccept = async (taskId: number) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8000/ai/decompose/${taskId}/accept`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({steps: decomposedSteps})
        })
        if (response.ok) {
            setIsDecomposedModal(false)
            setTaskToDecompose(null)
            setDecomposedSteps([])
            await fetchTasks()
        }
    }

    const handleSaveProfile = async (preferences: string, struggles: string) => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/users/me', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({preferences, struggles})
        })

        if(response.ok){
            setIsUserProfileModal(false)
            await fetchUser()
        }
    }


    useEffect(() => {
        void fetchTasks()
        void fetchUser()
    }, [])

    useEffect(() => {
        if (selectedTask) {
            const updated = tasks.find(t => t.id === selectedTask.id)
            if (updated) setSelectedTask(updated)
        }
    }, [tasks]);

    const filteredTasks = tasks
    .filter(task => !hideCompleted || !task.is_completed)
    .filter(task => filterPriority === null || task.priority === filterPriority)


    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>

            {decomposingTaskId && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Decomposing your task...</p>
                </div>
            )}
            <Navbar isDark={isDark} onToggleTheme={toggle} onLogout={handleLogout} onOpenProfile={() =>setIsUserProfileModal(true)}/>
            <main className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">My tasks</p>
                    <Button onClick={() => setIsOpen(true)} className='bg-emerald-500 text-foreground'>New task</Button>
                </div>
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => setHideCompleted(prev => !prev)}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                            hideCompleted
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700'
                                : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
                        }`}
                    >
                        Hide completed
                    </button>

                    {[
                        {label: 'All', value: null},
                        {label: '🔴 Now', value: 1},
                        {label: '🟡 Normal', value: 2},
                        {label: '🟢 Someday', value: 3},
                    ].map(filter => (
                        <button
                            key={String(filter.value)}
                            onClick={() => setFilterPriority(filter.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                                filterPriority === filter.value
                                    ? 'bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 border-slate-800 dark:border-slate-100'
                                    : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                >
                    {tasks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <p className="text-slate-400 dark:text-slate-500 text-sm">No tasks yet.</p>
                            <p className="text-slate-300 dark:text-slate-600 text-xs mt-1">Click "New task" to get
                                started.</p>
                        </div>
                    )}

                    {filteredTasks.map(task => (
                        <TaskCard key={task.id} task={task} onDecompose={handleDecompose} onDelete={handleDeleteTask}
                                  onClick={() => {
                                      setSelectedTask(task)
                                      setIsTaskModalOpen(true)

                                  }}
                                  decomposingTaskId={decomposingTaskId}
                        />

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
                    onComplete={handleComplete}
                    onAddSubtask={handleAddSubtask}
                    onCompleteSubtask={handleCompleteSubtask}
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

            {taskToDecompose && (
                <DecomposeModal
                    isOpen={isDecomposedModal}
                    steps={decomposedSteps}
                    onAccept={() => handleAccept(taskToDecompose)}
                    onRegenerate={() => handleDecompose(taskToDecompose)}
                    onCancel={() => setIsDecomposedModal(false)}
                    decomposedTaskId={decomposingTaskId}
                />
            )}

            {user && (
                <UserProfileModal
                    isOpen={isUserProfileModal}
                    onClose={() => setIsUserProfileModal(false)}
                    currentPreferences={user.preferences ?? ''}
                    currentStruggles={user.struggles ?? ''}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    )
}

export default Dashboard