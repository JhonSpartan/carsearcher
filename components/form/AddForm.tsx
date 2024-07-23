import { carDrives, carTypes, doorsCounts, fuels, generations, manufacturers, manufacturersAndModels, placesCounts, transmissions, yearsOfProduction } from '@/constants';
import { useCreateCar } from '@/libs/hooks';
import { carProps, NotifyData } from '@/types';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react'

const AddForm = (props: {setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>}) => {

  const  { setOpenPopup, setNotify } = props;

  const [models, setModels] = useState(['No manufacturer chosen']);
  const [manufacturer, setManuFacturer] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [yearOfProduction, setYearOfProduction] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [placesCount, setPlacesCount] = useState<string>('');
  const [doorsCount, setDoorsCount] = useState<string>('');
  const [generation, setGeneration] = useState<string>('');
  const [carType, setCarType] = useState<string>('');
  const [carDrive, setCarDrive] = useState<string>('');

  useEffect(() => {
    for (let item of manufacturersAndModels) {
      if (manufacturer !== '' && item.manufacturer === manufacturer) {
        setModels(item.models)
        return
      } else {
        setModels(['No manufacturer chosen'])
      }
    }

  }, [manufacturer]);

  const uniqueKey = (`${manufacturer}${model}${fuelType}${yearOfProduction}${transmission}${carDrive}
  ${carType}${generation}${placesCount}${doorsCount}`).replace(/ /g, "");

  const car: carProps = {
    manufacturer: manufacturer,
    model: model,
    fuelType: fuelType,
    yearOfProduction: yearOfProduction,
    transmission: transmission,
    carDrive: carDrive,  
    carType: carType,
    generation: generation,
    placesCount: placesCount,
    doorsCount: doorsCount,
    uniqueKey: uniqueKey,
  }


  const createCarMutation = useCreateCar(setNotify);
  const handleCreateCar = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createCarMutation.mutate(car);
    setOpenPopup(false)
  } 

  return (
    <form onSubmit={handleCreateCar}>
      <Box sx={{display: 'grid', gridTemplateRows: 'minmax(0, 1fr)', gridTemplateColumns: {mobile: 'repeat(2, 1fr)', xs: '1fr'}}}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={manufacturers}
            sx={{
              width: '80%',
              m: 1,
              mx: 'auto',
              gridColumn: 1,
              gridRow: 1,
            }}
            renderInput={(params) => <TextField {...params} label="Manufacturer" />}
            freeSolo={true}
            blurOnSelect={true}
            inputValue={manufacturer}
            onInputChange={(e: any, newValue: string) => setManuFacturer(newValue)}   
          />
          <Autocomplete
            disablePortal
            id="disabled"
            options={models}
            sx={{
              width: '80%',
              m: 1,
              mx: 'auto',
              gridColumn: 1,
              gridRow: 2
            }}
            renderInput={(params) => <TextField {...params} label="Model" />}
            freeSolo={true}
            blurOnSelect={true}
            inputValue={model}
            onInputChange={(e: any, newValue: string) => setModel(newValue)}
            getOptionDisabled={(option) =>
              option === models[0] ? option === 'No manufacturer chosen' : option === null
            }
          />
           <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: 1,
                gridRow: 3
              }}
            >
              <InputLabel id="demo-simple-select-label">Car drive</InputLabel> 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carDrive}
                label="Car drive"
                onChange={ (e) => setCarDrive(e.target.value)}
                
              >
                {carDrives.map((ye) => (
                  <MenuItem key={ye.value} value={ye.value}>
                    {ye.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: 1,
                gridRow: 4
              }}
            >
              <InputLabel id="demo-simple-select-label">Car type</InputLabel> 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={carType}
                label="Car type"
                onChange={ (e) => setCarType(e.target.value)}
                
              >
                {carTypes.map((ye) => (
                  <MenuItem key={ye.value} value={ye.value}>
                    {ye.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: 1,
                gridRow: 5
              }}
            >
              <InputLabel id="demo-simple-select-label">Generation</InputLabel> 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={generation}
                label="Generation"
                onChange={ (e) => setGeneration(e.target.value)}
                
              >
                {generations.map((ye) => (
                  <MenuItem key={ye.value} value={ye.value}>
                    {ye.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <FormControl 
            sx={{
              gridColumn: {mobile: 2, xs: 1},
              gridRow: {mobile: 1, xs: 10},
              ml: {md: 5, sm: 4, xs: 3}
            }}
          >
            <FormLabel>Transmission</FormLabel>
            <RadioGroup 
              row
              onChange={ (e) => setTransmission(e.target.value)}
            >
              <FormControlLabel value="Manualna" control={<Radio />} label="Manualna" />
              <FormControlLabel value="Automatyczna" control={<Radio />} label="Automatyczna" />
            </RadioGroup>
          </FormControl>
          <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: {mobile: 2, xs: 1},
                gridRow: {mobile: 2, xs: 6},
              }}
            >
              <InputLabel id="demo-simple-select-label">Year of production</InputLabel> 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={yearOfProduction}
                label="Year of production"
                onChange={ (e) => setYearOfProduction(e.target.value)}
                
              >
                {yearsOfProduction.map((ye) => (
                  <MenuItem key={ye.value} value={ye.value}>
                    {ye.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: {mobile: 2, xs: 1},
                gridRow: {mobile: 3, xs: 7},
              }}
            >
              <InputLabel id="demo-simple-select-label">Fuel type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fuelType}
                label="Fuel type"
                onChange={ (e) => setFuelType(e.target.value)}
              >
                {fuels.map((fue) => (
                  <MenuItem key={fue.value} value={fue.value}>
                    {fue.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: {mobile: 2, xs: 1},
                gridRow: {mobile: 4, xs: 8},
              }}
            >
              <InputLabel id="demo-simple-select-label">Doors count</InputLabel> 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={doorsCount}
                label="Doors count"
                onChange={ (e) => setDoorsCount(e.target.value)}
                
              >
                {doorsCounts.map((ye) => (
                  <MenuItem key={ye.value} value={ye.value}>
                    {ye.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: '80%',
                m: 1,
                mx: 'auto',
                gridColumn: {mobile: 2, xs: 1},
                gridRow: {mobile: 5, xs: 9},
              }}
            >
              <InputLabel id="demo-simple-select-label">Places count</InputLabel> 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={placesCount}
                label="Places count"
                onChange={ (e) => setPlacesCount(e.target.value)}
                
              >
                {placesCounts.map((ye) => (
                  <MenuItem key={ye.value} value={ye.value}>
                    {ye.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <Button
            size="large"
            color="primary"  
            variant="contained"
            type="submit" 
            sx={{
              width: {mobile: '35%', xs: '80%'},
              m: 1,
              mx: 'auto',
              gridColumn: {mobile: '1/3', xs: 1},
              gridRow: {mobile: 6, xs: 11},
            }}
          >Add a car</Button>
      </Box>
    </form>
  )
}

export default AddForm