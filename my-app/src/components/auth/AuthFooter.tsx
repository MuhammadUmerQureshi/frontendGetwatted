export function AuthFooter() {
  return (
    <>
      {/* Contact Administrator */}
      <div className="text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <a href="#" className="text-yellow-500 hover:text-yellow-400">
          Contact administrator
        </a>
      </div>

      {/* Copyright Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Getwatted. All rights reserved.
      </div>
    </>
  )
}