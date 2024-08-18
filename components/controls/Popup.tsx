"use client"

import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const Popup = (props: { title: string, children?: React.ReactNode, openPopup: boolean, setOpenPopup: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const  { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle
        sx={{minWidth: {md: '900px', sm: '700px'}}}
      >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: 'flex',
                flexGrow: 1
              }}
            >
              {title}
            </Typography>
            <CloseIcon 
              sx={{
                color: '#ec6261',
                '&:hover': {
                  color:  '#f3a0a0',
                },  
                fontSize: '28px', 
                cursor: 'pointer'
              }}
              onClick={() => {setOpenPopup(false)}}
            />
         </Box>
      </DialogTitle>
      <DialogContent 
        sx={{minWidth: {md: '900px', sm: '700px'}}}
        dividers 
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Popup