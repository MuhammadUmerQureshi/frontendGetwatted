import logo from '@/assets/logo.png'

export function LoginHeader() {
  return (
    <>
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img src={logo} alt="Getwatted Logo" className="h-16 w-auto" />
      </div>

      {/* Welcome Text */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-yellow-500">Welcome Back</h1>
        <p className="text-sm text-gray-400">Sign in to manage your charging stations</p>
      </div>
    </>
  )
}