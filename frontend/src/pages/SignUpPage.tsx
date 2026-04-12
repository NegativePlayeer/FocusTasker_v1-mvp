import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {motion, AnimatePresence} from "framer-motion";

function SignUpPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [step, setStep] = useState<1 | 2>(1)
    const [selectedStruggles, setSelectedStruggles] = useState<string[]>([])
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
    const [error, setError] = useState<string>('')

    const checkPassword = (password: string, rePassword: string): boolean => {
        if (password !== rePassword) {
            setError('Passwords do not match')
            return false
        }
        return true
    }

    const submitSignUp = async (preferences: string, struggles: string) => {
        const response = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                first_name: firstname,
                surname,
                username,
                password,
                role: 'user',
                preferences: preferences || null,
                struggles: struggles || null,
            })
        })

        if (response.ok) {
            navigate('/login')
        } else {
            setError('Email or username already taken')
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!checkPassword(password, confirmPassword)) return
        await submitSignUp('', '')
    }

    const handleSaveAndSignUp = async () => {
        const preferences = selectedPreferences.join(', ')
        const struggles = selectedStruggles.join(', ')
        await submitSignUp(preferences, struggles)
    }

    const canProceedToStep2 = () => {
        return [email, firstname, surname, username, password, confirmPassword].every(field => field.trim() !== '')
            && password === confirmPassword
    }

    const STRUGGLES_TAGS = [
        'Procrastination', 'Distraction', 'Task initiation',
        'Time blindness', 'Forgetfulness', 'Decision paralysis',
        'Hyperfocus', 'Overwhelm'
    ]

    const PREFERENCES_TAGS = [
        'Short sessions (25 min)', 'Frequent breaks', 'Step-by-step instructions',
        'Visual progress', 'Background music', 'Morning focus',
        'Evening focus', 'Pomodoro technique'
    ]

    return (
        <AnimatePresence mode='wait'>
            {step === 1 && (
                <motion.div
                    key='step1'
                    initial={{opacity: 0, x: 0}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -100}}
                    transition={{duration: 0.3}}
                >
                    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">FocusTracker</h1>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Your calm space to get things done</p>
                        </div>

                        <div className="flex gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-sky-500"/>
                            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700"/>
                        </div>

                        <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200">Create your account</h2>
                                <button onClick={() => navigate('/login')} className="text-sm text-sky-500 hover:text-sky-600 transition-colors cursor-pointer">
                                    Sign in
                                </button>
                            </div>

                            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        required
                                        className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="firstname">First name</label>
                                        <Input
                                            id="firstname"
                                            type="text"
                                            value={firstname}
                                            required
                                            className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="surname">Surname</label>
                                        <Input
                                            id="surname"
                                            type="text"
                                            value={surname}
                                            required
                                            className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            onChange={(e) => setSurname(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="username">Username</label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        required
                                        className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="password">Password</label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            required
                                            className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm text-slate-500 dark:text-slate-400" htmlFor="confirm-password">Confirm</label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            value={confirmPassword}
                                            required
                                            className="h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {error && <p className="text-red-400 text-xs">{error}</p>}

                                <div className="flex flex-col gap-2 mt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={!canProceedToStep2()}
                                        className="h-11 rounded-xl cursor-pointer border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                                        onClick={() => setStep(2)}
                                    >
                                        Set my preferences →
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-11 bg-sky-500 hover:bg-sky-600 text-white rounded-xl cursor-pointer"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div
                    key='step2'
                    initial={{opacity: 0, x: 100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 100}}
                    transition={{duration: 0.3}}
                >
                    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">FocusTracker</h1>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Your calm space to get things done</p>
                        </div>

                        <div className="flex gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-sky-500"/>
                            <div className="w-2 h-2 rounded-full bg-sky-500"/>
                        </div>

                        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <h2 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">Your focus profile</h2>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">Select what describes you best. You can change this later.</p>

                            <div className="flex flex-col gap-6">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">My struggles</p>
                                    <div className="flex flex-wrap gap-2">
                                        {STRUGGLES_TAGS.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setSelectedStruggles(prev =>
                                                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                                )}
                                                className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                                                    selectedStruggles.includes(tag)
                                                        ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800'
                                                        : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">My preferences</p>
                                    <div className="flex flex-wrap gap-2">
                                        {PREFERENCES_TAGS.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setSelectedPreferences(prev =>
                                                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                                )}
                                                className={`px-3 py-1.5 rounded-lg text-sm border transition-all cursor-pointer ${
                                                    selectedPreferences.includes(tag)
                                                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                                        : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                                }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <Button
                                    variant="outline"
                                    className="cursor-pointer rounded-xl border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </Button>
                                <Button
                                    className="flex-1 h-11 bg-sky-500 hover:bg-sky-600 text-white rounded-xl cursor-pointer"
                                    onClick={handleSaveAndSignUp}
                                >
                                    Save & Sign up
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SignUpPage
