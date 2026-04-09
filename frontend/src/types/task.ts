export interface Subtask {
    id: number
    title: string
    is_completed: boolean
}

export interface Task{
    id: number
    title: string
    description: string
    priority: number
    is_completed: boolean
    subtasks: Subtask[]
}

export interface DecomposeStep {
    step: number
    title: string
    duration_minutes: number
}