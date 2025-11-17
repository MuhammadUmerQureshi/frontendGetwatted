import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useLogin } from '@/api/hooks/useAuth'

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const loginMutation = useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await loginMutation.mutateAsync({
        credentials: { username, password }
      })

      if (response.status && response.res_data) {
        console.log("Login Successful:", response)
        console.log("Access Token:", response.res_data.access_token)
        console.log("Token Type:", response.res_data.token_type)
        console.log("Expires In:", response.res_data.expires_in, "seconds")

        alert(`Login Successful! ${response.message}\nToken stored in localStorage.`)
      } else {
        alert(`Login Failed: ${response.message}`)
      }
    } catch (error: any) {
      console.error("Login Error:", error)
      alert(`Login Failed: ${error.message || 'An error occurred'}`)
    }
  }

  const isAuthenticated = !!localStorage.getItem('access_token')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {import.meta.env.VITE_APP_NAME || 'Getwatted-CSMS'}
          </CardTitle>
          <CardDescription>
            {isAuthenticated ? (
              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                You are already logged in
              </span>
            ) : (
              'Enter your credentials to access the dashboard'
            )}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="john@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loginMutation.isPending}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loginMutation.isPending}
              />
            </div>
            {loginMutation.isError && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {loginMutation.error?.message || 'Login failed. Please try again.'}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {setUsername(''); setPassword('')}}
              disabled={loginMutation.isPending}
            >
              Clear
            </Button>
            <Button disabled={loginMutation.isPending} type="submit">
              {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loginMutation.isPending ? "Verifying..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default App