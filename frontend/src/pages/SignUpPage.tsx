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

    const checkPassword = (password: string, rePassword: string): boolean => {
        return password == rePassword;
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!checkPassword(password, confirmPassword)) {
            console.log('wrong password')
            return
        }

        const response = await fetch('http://localhost:8000/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, first_name: firstname, surname, username, password, role: 'user'})
        })

        if (response.ok) {
            navigate('/login')
        }
    }

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
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                </CardContent>
                                <Button type='button' onClick={() => setStep(2)}>Set my preferences</Button>
                                <CardFooter className='flex-col gap-2'>
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
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100}}
                    transition={{ duration: 0.3 }}
                    >
                    {}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SignUpPage