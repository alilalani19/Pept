'use client'

interface ConfirmDeleteButtonProps {
  action: () => void
  message?: string
  label?: string
}

export function ConfirmDeleteButton({
  action,
  message = 'Are you sure? This action cannot be undone.',
  label = 'Delete',
}: ConfirmDeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600 transition-colors"
      >
        {label}
      </button>
    </form>
  )
}
