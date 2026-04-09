import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
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

    const checkPassword = (password: string, rePassword: string): boolean => {
        return password == rePassword;
    }

    const submitSignUp = async(preferences: string, struggles:string ) => {
        const response = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, first_name: firstname, surname, username, password, role: 'user', preferences, struggles})
        })

        if (response.ok) {
            navigate('/login')
        }
    }

    const handleSaveAndSignUp = async () => {
        const preferences = selectedPreferences.join(', ')
        const struggles = selectedStruggles.join(', ')

        await submitSignUp(preferences, struggles)
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!checkPassword(password, confirmPassword)) {
            console.log('wrong password')
            return
        }
        await submitSignUp('', '')
    }

    const canProceedToStep2 = () => {
    return [email, firstname, surname, username, password, confirmPassword].every(field => field.trim() !== '')
        && checkPassword(password, confirmPassword)
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
                    <div className="min-h-screen bg-background flex items-center justify-center">
                        <Card className='w-full max-w-sm'>
                            <CardHeader>
                                <CardTitle>Sign up to discover new you!</CardTitle>
                                <CardDescription>
                                    Make your life organized and happy!
                                </CardDescription>
                                <CardAction>
                                    <Button variant="link" onClick={() => navigate('/login')}>Sign in</Button>
                                </CardAction>
                            </CardHeader>
                            <form onSubmit={handleSignUp}>
                                <CardContent>
                                    <div className="flex flex-col gap-8">
                                        <div className="grid gap-2">
                                            <Label htmlFor='email'>Email</Label>
                                            <Input
                                                id='email'
                                                type='email'
                                                className="cursor-pointer"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor='firstname'>Firstname</Label>
                                            <Input
                                                id='firstname'
                                                type='text'
                                                className="cursor-pointer"
                                                value={firstname}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor='surname'>Surname</Label>
                                            <Input
                                                id='surname'
                                                type='text'
                                                className="cursor-pointer"
                                                value={surname}
                                                onChange={(e) => setSurname(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor='username'>Username</Label>
                                            <Input
                                                id='username'
                                                type='text'
                                                className="cursor-pointer"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor='password'>Password</Label>
                                            <Input
                                                id='password'
                                                type='password'
                                                className="cursor-pointer"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor='confirm-password'>Confirm Password</Label>
                                            <Input
                                                id='confirm-password'
                                                type='password'
                                                className="cursor-pointer"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                </CardContent>
                                <CardFooter className='flex-col gap-2'>
                                    <Button type='button' variant='outline' className="cursor-pointer w-full"
                                            onClick={() => canProceedToStep2() && setStep(2)}>
                                        Set my preferences →
                                    </Button>
                                    <Button type='submit' className="cursor-pointer w-full">Sign up</Button>
                                </CardFooter>
                            </form>
                        </Card>
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
                    {
                        <div className="min-h-screen bg-background flex items-center justify-center">
                            <Card className='w-full max-w-md'>
                                <CardHeader>
                                    <CardTitle>Your ADHD profile</CardTitle>
                                    <CardDescription>Select tags that describe you. You can add your own
                                        too.</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-6">
                                    <div>
                                        <p className="font-semibold text-sm mb-2">My struggles:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {STRUGGLES_TAGS.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => {
                                                        setSelectedStruggles(prev =>
                                                            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                                        )
                                                    }}
                                                    className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer ${
                                                        selectedStruggles.includes(tag)
                                                            ? 'bg-sky-500 text-white border-sky-500'
                                                            : 'bg-transparent text-foreground border-border'
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm mb-2">My preferences:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {PREFERENCES_TAGS.map(tag => (
                                                <button
                                                    key={tag}
                                                    onClick={() => {
                                                        setSelectedPreferences(prev =>
                                                            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                                                        )
                                                    }}
                                                    className={`px-3 py-1 rounded-full text-sm border transition-all cursor-pointer ${
                                                        selectedPreferences.includes(tag)
                                                            ? 'bg-emerald-500 text-white border-emerald-500'
                                                            : 'bg-transparent text-foreground border-border'
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-around gap-2 ">
                                    <Button className='cursor-pointer' variant="outline" onClick={() => setStep(1)}>← Back</Button>
                                    <Button className="w-1/2 cursor-pointer" onClick={handleSaveAndSignUp}>Save & Sign up
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    }
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SignUpPage