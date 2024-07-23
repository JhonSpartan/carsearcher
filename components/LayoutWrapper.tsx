"use client"

import { useThemeContext } from '@/libs/contexts/context';
import { Box } from '@mui/material'
import React from 'react'

const LayoutWrapper = (props: {children?: React.ReactNode}) => {

  const { children } = props;

  const { dark } = useThemeContext();

  return (
    <Box sx={{ display: 'flex', bgcolor: `${dark ? '#111111' : '#f5f6fb'}`, minHeight: '100vh' }}>{children}</Box>
  )
}

export default LayoutWrapper