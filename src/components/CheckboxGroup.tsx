interface CheckboxGroupProps {
  label: string
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
}

export function CheckboxGroup({ label, options, value, onChange }: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-text-secondary">{label}</label>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const checked = value.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer
                transition-all duration-200 text-left
                ${checked
                  ? 'bg-accent/10 border-accent text-accent'
                  : 'bg-card border-border text-text-secondary hover:border-text-muted hover:text-text'
                }
              `}
            >
              <div
                className={`
                  w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0
                  transition-all duration-200
                  ${checked ? 'bg-accent border-accent' : 'border-text-muted'}
                `}
              >
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 4" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-medium">{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
