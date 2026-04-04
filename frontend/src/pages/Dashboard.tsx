import {useEffect, useState} from "react";

interface Task {
    id: number
    title: string
    description: string
    priority: number
    is_completed: boolean
}


function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const listTasks = tasks.map(task => <li key={task.id}>{task.title}</li>)

    useEffect(() => {
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
        fetchTasks()
    }, [])

    return (
        <div>
            <ul>{listTasks}</ul>
        </div>
    )
}

export default Dashboard