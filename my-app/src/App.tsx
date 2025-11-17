import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function App() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create the Basic Auth string (username:password encoded in base64)
      const credentials = btoa(`${username}:${password}`)

      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 👇 Add this header
          'Authorization': `Basic ${credentials}`, 
        },
        // Keep the body just in case, or remove it if your backend only checks headers
        body: JSON.stringify({ 
          username, 
          password 
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log("Login Successful:", data)
      alert("Login Successful! Check console for your token.")
      
    } catch (error: any) {
      console.error("Login Error:", error)
      alert(`Login Failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>System Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required
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
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="ghost" 
              type="button" 
              onClick={() => {setUsername(''); setPassword('')}}
            >
              Clear
            </Button>
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Verifying..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default App