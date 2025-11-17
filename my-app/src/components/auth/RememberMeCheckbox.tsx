interface RememberMeCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function RememberMeCheckbox({ checked, onChange }: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-700 bg-[#2a2a2a] text-yellow-500 focus:ring-yellow-500"
        />
        <span className="text-sm text-gray-400">Remember me</span>
      </label>
      <a href="#" className="text-sm text-yellow-500 hover:text-yellow-400">
        Forgot password?
      </a>
    </div>
  )
}