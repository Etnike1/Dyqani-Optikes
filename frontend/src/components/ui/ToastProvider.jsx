import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export const useToast = () => useContext(ToastContext)

const TOAST_LIFETIME = 3600
const MAX_TOASTS = 4

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const notify = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((current) => {
      const next = [{ id, message, type }, ...current]
      return next.slice(0, MAX_TOASTS)
    })
    window.setTimeout(() => removeToast(id), TOAST_LIFETIME)
  }, [removeToast])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-end px-4 sm:px-6">
        <div className="flex w-full max-w-sm flex-col gap-3">
          {toasts.map(({ id, message, type }) => (
            <div
              key={id}
              role="status"
              aria-live="polite"
              className={`pointer-events-auto rounded-3xl border p-4 shadow-card-md transition duration-200 ${
                type === 'error'
                  ? 'border-danger-200 bg-danger-50 text-danger-700'
                  : type === 'info'
                  ? 'border-info-200 bg-info-50 text-info-700'
                  : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium">{message}</p>
                <button
                  type="button"
                  onClick={() => removeToast(id)}
                  className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}
