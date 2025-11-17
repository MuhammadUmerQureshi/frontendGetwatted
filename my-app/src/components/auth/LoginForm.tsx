import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useLogin } from '@/api/hooks/useAuth'
import { RememberMeCheckbox } from './RememberMeCheckbox'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const loginMutation = useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    try {
      const response = await loginMutation.mutateAsync({
        credentials: { username: email, password }
      })

      if (response.status && response.res_data) {
        console.log("Login Successful:", response)
        onSuccess?.()
        // Navigate to dashboard here
      } else {
        // Show "Invalid email or password" for failed login
        setErrorMessage("Invalid email or password")
      }
    } catch (error: any) {
      console.error("Login Error:", error)
      // Show "Invalid email or password" for any error
      setErrorMessage("Invalid email or password")
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* Email Address */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loginMutation.isPending}
          className="h-12 border-gray-700 bg-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loginMutation.isPending}
          className="h-12 border-gray-700 bg-[#2a2a2a] text-white placeholder:text-gray-500 focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>

      {/* Remember Me & Forgot Password */}
      <RememberMeCheckbox checked={rememberMe} onChange={setRememberMe} />

      {/* Error Message */}
      {(errorMessage || loginMutation.isError) && (
        <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">
          {errorMessage || 'Invalid email or password'}
        </div>
      )}

      {/* Sign In Button */}
      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="h-12 w-full bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
      >
        {loginMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {loginMutation.isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  )
}