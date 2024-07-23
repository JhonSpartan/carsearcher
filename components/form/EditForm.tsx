import { carDrives, carTypes, doorsCounts, fuels, generations, manufacturers, manufacturersAndModels, placesCounts, transmissions, yearsOfProduction } from '@/constants';
import { useUpdateCar } from '@/libs/hooks';
import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { useEffect, useState, } from 'react'

const EditForm = ({setOpenPopup, setNotify, car}: any) => {

  const  { manufacturer, model, fuelType, transmission, yearOfProduction, carDrive, carType, generation, placesCount, doorsCount } = car;
  
  const [models, setModels] = useState<string[]>(['No manufacturer chosen']);
  const [newManufacturer, setNewManufacturer] = useState<string>(manufacturer);
  const [newModel, setNewModel] = useState<string>(model);
  const [newFuelType, setNewFuelType] = useState<string>(fuelType);
  const [newTransmission, setNewTransmission] = useState<string>(transmission);
  const [newYearOfProduction, setNewYearOfProduction] = useState<string>(yearOfProduction);
  const [newPlacesCount, setNewPlacesCount] = useState<string>(placesCount);
  const [newDoorsCount, setNewDoorsCount] = useState<string>(doorsCount);
  const [newGeneration, setNewGeneration] = useState<string>(generation);
  const [newCarType, setNewCarType] = useState<string>(carType);
  const [newCarDrive, setNewCarDrive] = useState<string>(carDrive);

  useEffect(() => {
    for (let item of manufacturersAndModels) {
      if (newManufacturer !== '' && item.manufacturer == newManufacturer) {
        setModels(item.models)
        return
      } else {
        setModels(['No manufacturer chosen'])
      }
    }
  }, [newManufacturer]);


  const updateCarMutation = useUpdateCar(setNotify);
  const handleEditCar = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateCarMutation.mutate({
      ...car, manufacturer: newManufacturer, model: newModel, fuelType: newFuelType, 
      transmission: newTransmission, yearOfProduction: newYearOfProduction, carDrive: newCarDrive, 
      carType: newCarType, generation: newGeneration, placesCount: newPlacesCount, doorsCount: newDoorsCount
    })
    setOpenPopup();
  } 

  return (
    <form onSubmit={handleEditCar}>
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
            inputValue={newManufacturer}
            onInputChange={(e: any, newValue: string) => setNewManufacturer(newValue)}   
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
            inputValue={newModel}
            onInputChange={(e: any, newValue: string) => setNewModel(newValue)}
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
              value={newCarDrive}
              label="Car drive"
              onChange={ (e) => setNewCarDrive(e.target.value)}
              
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
              value={newCarType}
              label="Car type"
              onChange={ (e) => setNewCarType(e.target.value)}
              
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
              value={newGeneration}
              label="Generation"
              onChange={ (e) => setNewGeneration(e.target.value)}
              
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
              name="transmission"
              value={newTransmission}
              onChange={ (e) => setNewTransmission(e.target.value)}
            >
              <FormControlLabel value="Manual" control={<Radio />} label="Manual" />
              <FormControlLabel value="Automat" control={<Radio />} label="Automat" />
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
                value={newYearOfProduction}
                label="Year of production"
                onChange={ (e) => setNewYearOfProduction(e.target.value)}

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
                value={newFuelType}
                label="Fuel type"
                onChange={ (e) => setNewFuelType(e.target.value)}
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
                value={newDoorsCount}
                label="Doors count"
                onChange={ (e) => setNewDoorsCount(e.target.value)}     
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
                value={newPlacesCount}
                label="Places count"
                onChange={ (e) => setNewPlacesCount(e.target.value)}
                
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
          >Edit car</Button>
      </Box>
    </form>
  )
}

export default EditForm