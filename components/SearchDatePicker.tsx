import { useUpdateSearchOptions } from '@/libs/hooks';
import { OptionsShape } from '@/types';
import { Box, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

const SearchDatePicker = (props: OptionsShape) => {


  const [date, setDate] = useState<any>(null);
  const [shrink, setShrink] = useState<boolean>(false);

  const { options } = props;

  const updateSearchOptionMutation = useUpdateSearchOptions()

  const handleUpdateDate = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateSearchOptionMutation.mutate({...options, date: date})
    setDate(null);
  } 

  return (
    <Box component='form' sx={{display: 'flex', flexDirection: 'column', width: '100%'}} onSubmit={handleUpdateDate}>
      <DateTimePicker
        label="Set date/time limit"
        value={date}
        onChange={(newValue) => setDate(newValue)}
        slotProps={{ 
          textField: { 
            size: 'small', 
            required: true, 
            InputLabelProps: { sx: { ml: 4.5, fontSize: {mobile: 15, sm: 16, tablet: 15, lg: 16} }, shrink },
            onFocus: () => setShrink(true),
            onBlur: (e) => setShrink(!!e.target.value),
            sx: (theme) => ({
              '& .Mui-focused .MuiButtonBase-root': {
                color: theme.palette.primary.main,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                px: 5.5
              },
              mb: 1,
            })
          },
          inputAdornment: 
            { 
              position: 'start',  
              onClick: () => setShrink(true),
            },
        }}
        sx={{
          mb: 1,
        }}   
      />
      <Button 
        variant="contained" 
        type="submit" 
        size="small" 
        fullWidth
      >
        Confirm limit
      </Button>
      
    </Box>
  )
}

export default SearchDatePicker