import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base = 'rounded-full px-5 py-2 font-medium transition-all inline-block'
  const styles = variant === 'primary'
    ? 'bg-forest text-white hover:bg-forest-600 shadow-sm'
    : 'bg-white border border-forest text-forest hover:bg-cream'

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}
