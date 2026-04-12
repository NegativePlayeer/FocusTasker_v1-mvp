import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

function LoginPage() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('token', data.access_token)
            navigate('/dashboard')
        } else {
            setError('Wrong username or password')
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">FocusTracker</h1>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Your calm space to get things done</p>
            </div>

            <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-6">Welcome back</h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="username">Username</label>
                        <Input
                            id="username"
                            type="text"
                            required
                            className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="password">Password</label>
                            <a href="#" className="text-xs text-sky-500 hover:text-sky-600 transition-colors">Forgot password?</a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    <Button type="submit" className="mt-2 h-11 bg-sky-500 hover:bg-sky-600 text-white rounded-xl cursor-pointer w-full">
                        Login
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-6">
                    No account?{' '}
                    <button onClick={() => navigate('/signup')} className="text-sky-500 hover:text-sky-600 transition-colors cursor-pointer">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
