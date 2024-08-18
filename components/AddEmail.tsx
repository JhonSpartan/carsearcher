"use client"

import { useState } from 'react'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import { updateEmailAction } from '@/libs/services';

const AddEmail = () => {

  const [email, setEmail] = useState('');
  const [shrink, setShrink] = useState(false);

  const handleUpdateEmail = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateEmailAction(email);
    setEmail('');
    setShrink(false);
  }

  return (
      <Box component='form' sx={{display: 'flex', flexDirection: 'column', width: '100%'}} onSubmit={handleUpdateEmail}>
        <TextField
          label="Email"
          variant="outlined"
          value={email} 
          size="small"
          fullWidth
          required
          sx={(theme) => ({
            '& .Mui-focused .MuiInputAdornment-root': {
              color: theme.palette.primary.main,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              px: 5.5
            },
            mb: 1,
          })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{fontSize: {md: 22, lg: 24}}}/>
              </InputAdornment>
            ),
            type: "email",
          }}
          onFocus={() => setShrink(true)}
          onBlur={(e) => setShrink(!!e.target.value)}
          InputLabelProps={{ sx: { ml: 4.5, fontSize: {mobile: 15, sm: 16, tablet: 15, lg: 16}, mt: {mobile: '1px', sm: 0, tablet: '1px', lg: 0} }, shrink }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
          variant="contained" 
          type="submit" 
          size="small" 
          fullWidth
        >
          Add email
        </Button>
      </Box>
  )
}

export default AddEmail