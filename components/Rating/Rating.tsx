'use client'

import cn from 'classnames'
import { forwardRef, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

import styles from './Rating.module.css'
import type { RatingProps } from './Rating.props'
import StarIcon from './star.svg'

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    isEditable = false,
    error,
    rating,
    setRating,
    tabIndex,
    className,
    ...props
  },
  ref,
) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const ratingRefs = useRef<Array<HTMLButtonElement | null>>([])

  const displayedRating = hoverRating ?? rating

  const computeTabIndex = (index: number): number => {
    if (!isEditable) {
      return -1
    }

    if (!rating && index === 0) {
      return tabIndex ?? 0
    }

    if (rating === index + 1) {
      return tabIndex ?? 0
    }

    return -1
  }

  const handleClick = (value: number) => {
    if (!isEditable) {
      return
    }

    setRating?.(value)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    value: number,
  ) => {
    if (!isEditable) {
      return
    }

    if (
      event.code !== 'ArrowRight' &&
      event.code !== 'ArrowUp' &&
      event.code !== 'ArrowLeft' &&
      event.code !== 'ArrowDown'
    ) {
      return
    }

    event.preventDefault()

    let nextRating = value

    if (event.code === 'ArrowRight' || event.code === 'ArrowUp') {
      nextRating = Math.min(rating + 1 || 1, 5)
    }

    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
      nextRating = Math.max(rating - 1, 1)
    }

    setRating?.(nextRating)

    requestAnimationFrame(() => {
      ratingRefs.current[nextRating - 1]?.focus()
    })
  }

  return (
    <div
      {...props}
      ref={ref}
      className={cn(styles.ratingWrapper, className, {
        [styles.error]: error,
      })}
      role={isEditable ? 'radiogroup' : undefined}
      aria-invalid={Boolean(error)}
    >
      {[1, 2, 3, 4, 5].map((value, index) => {
        const isFilled = value <= displayedRating

        if (isEditable) {
          return (
            <button
              key={value}
              type="button"
              className={cn(styles.star, styles.editable, {
                [styles.filled]: isFilled,
              })}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleClick(value)}
              onKeyDown={(event) => handleKeyDown(event, value)}
              tabIndex={computeTabIndex(index)}
              ref={(element) => {
                ratingRefs.current[index] = element
              }}
              role="radio"
              aria-checked={rating === value}
              aria-label={`Оценка ${value} из 5`}
            >
              <StarIcon aria-hidden="true" />
            </button>
          )
        }

        return (
          <span
            key={value}
            className={cn(styles.star, {
              [styles.filled]: isFilled,
            })}
            aria-hidden="true"
          >
            <StarIcon />
          </span>
        )
      })}

      {error?.message && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  )
})
