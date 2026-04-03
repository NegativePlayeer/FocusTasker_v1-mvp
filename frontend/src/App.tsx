// import {useState} from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, {useState} from "react";



function App() {
const [username, setUsername] = useState<string>('')
const [password, setPassword] = useState<string>('')

const handleLogin = async (e: React.FormEvent)=> {
    e.preventDefault()

    const formData  = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const response  = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: formData
    })

    if(response.ok){
        const data = await response.json()
        localStorage.setItem('token', data.access_token)
        console.log('Successfully Log In!')
    }else {
        console.log('Wrong username or password, try again!')
    }
}
  return (
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="Hello username..."
                required
                className="cursor-pointer"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                  id="password"
                  type="password"
                  required className="cursor-pointer"
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
             <CardFooter className="flex-col gap-2">
                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                >
                  Login
                </Button>
             </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

export default App
