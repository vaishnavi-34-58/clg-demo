import React, { createContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../utils/cn';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border text-xs font-medium transition-all animate-in slide-in-from-bottom-2 fade-in',
              t.type === 'success' && 'bg-emerald-900/90 text-emerald-100 border-emerald-700/60 backdrop-blur-md',
              t.type === 'error' && 'bg-rose-900/90 text-rose-100 border-rose-700/60 backdrop-blur-md',
              t.type === 'warning' && 'bg-amber-900/90 text-amber-100 border-amber-700/60 backdrop-blur-md',
              t.type === 'info' && 'bg-slate-900/90 text-slate-100 border-slate-700/60 backdrop-blur-md'
            )}
          >
            <div className="flex items-center gap-2.5">
              {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {t.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              {t.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
              {t.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
              <span>{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 hover:bg-white/10 rounded-md transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export { useToast } from '../hooks/useToast';
