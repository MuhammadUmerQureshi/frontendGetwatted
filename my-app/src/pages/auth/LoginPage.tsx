import { LoginHeader } from '@/components/auth/LoginHeader'
import { LoginForm } from '@/components/auth/LoginForm'
import { AuthFooter } from '@/components/auth/AuthFooter'

export function LoginPage() {
  const handleLoginSuccess = () => {
    // This will be called when login is successful
    // You can add navigation logic here later
    console.log('Login successful, redirecting to dashboard...')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      {/* Login Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#1a1a1a] p-8 shadow-2xl">
        <LoginHeader />
        <LoginForm onSuccess={handleLoginSuccess} />
        <div className="mt-6">
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}