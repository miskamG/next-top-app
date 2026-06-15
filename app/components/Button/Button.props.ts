import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance: 'primary' | 'ghost'
  arrow?: 'right' | 'down' | 'none'
  children: ReactNode
}
