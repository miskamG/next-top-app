'use client'

import { useState } from 'react'
import { Button } from './components/Button/Button'
import { P } from './components/P/P'
import { Rating } from './components/Rating/Rating'

export default function Home() {
  const [rating, setRating] = useState<number>(4)

  return (
    <>
      <Button appearance="primary" arrow="right">
        Primary
      </Button>
      <Button appearance="ghost" onClick={() => console.log('asdasdasd')}>
        Ghost
      </Button>
      <P size="l">Большой</P>
      <Rating rating={rating} isEditable setRating={setRating}></Rating>
    </>
  )
}
