import type { ComponentPropsWithoutRef } from 'react'
import type { FieldError } from 'react-hook-form'

export type RatingProps = ComponentPropsWithoutRef<'div'> & {
  isEditable?: boolean
  rating: number
  setRating?: (rating: number) => void
  error?: FieldError
}
