"use client"

import { addUserEmailToProduct, scrapeAndCompareCar } from '@/libs/actions';
import { useThemeContext } from '@/libs/contexts/context';
import { Options, SearchResult, SearchResultsShape } from '@/types';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Notification from './Notification';
import { createGraphDataAction, createSearchResultsAction, updateDateAction } from '@/libs/services';


const isValidOtomotoCarURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if(
      hostname.includes('otomoto.pl') || 
      hostname.includes ('otomoto.') || 
      hostname.endsWith('otomoto')
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

const SearchButton = (props: {options: Options}) => {

  const { options } = props;

  const { email, location } = options;

  const { loading, setLoading, setNotify } = useThemeContext();

  let cars: SearchResult[] = [];
  
  let maxTime: Date | undefined;

  let DateCheck = 0;



  const handleOnclick = async () => {

    let i = 0
    
    do {
      i++
      const isValidLink = isValidOtomotoCarURL(`https://www.otomoto.pl/osobowe?page=${i}`);

      if(!isValidLink) return alert('Please provide a valid Otomoto link')

      try { 
        setLoading(true);

        const filteredCars: any = await scrapeAndCompareCar(`https://www.otomoto.pl/osobowe?page=${i}`, location);


        if (filteredCars.booleans.length === 0) DateCheck += 1;

        if (filteredCars.booleans.length > 0 && DateCheck > 0) DateCheck = 0;

        for (let car of filteredCars.cars) {
          cars.push(car);
        }

        if(maxTime === undefined) {
          maxTime = filteredCars.maxTime;
        } else {
          if (filteredCars.maxTime > maxTime) {
            maxTime = filteredCars.maxTime;
          }
        }


      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    while (DateCheck < 5);
    DateCheck = 0;

    console.log(DateCheck);


    const results: SearchResultsShape = {
      cars: cars,
      read: false
    }

    const graphData: number = cars.length;

    if (cars.length > 0) {
      await createSearchResultsAction(results);
      await createGraphDataAction(graphData);
      await addUserEmailToProduct(cars, email);
    } else {
      setNotify({
        isOpen: true,
        message: 'No cars found',
        type: 'success'
      });
    }

    if (maxTime) await updateDateAction(maxTime); 
    
  }

  return (
    <>
      <Button 
        variant="contained"
        type="button" 
        size="large"
        color="success"
        onClick={handleOnclick}
        sx={{mx: 'auto'}}
      >
        {loading ? <Box sx={{display: 'flex', alignItems: 'center'}}><CircularProgress size="1rem" sx={{mr: 2, color: '#ffffff'}} /> <Typography>Searching...</Typography></Box> : <Typography>Search</Typography>}
      </Button> 
      <Notification/>
  </>
  )

}

export default SearchButton