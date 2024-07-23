"use client"

import { locations } from "@/constants";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useUpdateSearchOptions } from '@/libs/hooks';
import { OptionsShape } from '@/types';




const SwitchLocation = ( props: OptionsShape ) => {

  const { options } = props;

  const updateSearchOptionMutation = useUpdateSearchOptions()

  const handleUpdateLocation = (event: SelectChangeEvent) => {
    updateSearchOptionMutation.mutate({...options, location: event.target.value})
  } 

  return (
      <FormControl size="small" sx={{width: {tablet: '100%', mobile: '50%', xs: '100%'}, mx: {mobile: 'auto'}}}>
        <InputLabel id="demo-select-small-label" sx={{fontSize: {tablet: 15, lg: 16}}}>Choose search area</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Choose search area"
          onChange={handleUpdateLocation}
          sx={{mb: {xl: 0, tablet: '38.75px'}}}
        >
          {locations.map((loc) => (
            <MenuItem key={loc.value} value={loc.value} sx={{fontSize: {tablet: 15, lg: 16}}}>
              {loc.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}

export default SwitchLocation