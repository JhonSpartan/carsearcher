"use client"

import { Button } from '@mui/material'
import { cronLogic } from '@/app/api/cronLogic';

const TestButton = () => {
  return (
    <Button onClick={ () => cronLogic()}>TestButton</Button>
  )
}

export default TestButton