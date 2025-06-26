import { cn } from '@/app/utils/cn';
import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, className, variant = 'primary', size = 'md', ...props }, ref) => {
    const classes = [
      'relative font-semibold transition-all duration-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2',
      variant === 'primary' &&
        'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:from-blue-700 hover:to-indigo-700',
      variant === 'secondary' && 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100',
      variant === 'danger' &&
        'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-xl hover:from-red-600 hover:to-rose-700',
      variant === 'ghost' &&
        'bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
      size === 'md' && 'px-4 py-2 text-base',
      size === 'sm' && 'px-3 py-1.5 text-sm',
      size === 'lg' && 'px-6 py-3 text-lg',
      (loading || props.disabled) && 'opacity-60 cursor-not-allowed',
      className,
    ];
    return (
      <button ref={ref} disabled={loading || props.disabled} className={cn(...classes)} {...props}>
        {loading && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            <span className="inline-block w-4 h-4 border-2 border-t-2 border-t-white border-white/30 rounded-full animate-spin"></span>
          </span>
        )}
        <span className={loading ? 'opacity-60' : ''}>{children}</span>
      </button>
    );
  },
);
Button.displayName = 'Button';
