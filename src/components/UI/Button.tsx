import React, { forwardRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 rounded-md  font-medium transition-colors focus-visible:outline-none
       focus-visible:ring-1 disabled:opacity-50  shadow hover:bg-midnight/90 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
);

export default Button;
