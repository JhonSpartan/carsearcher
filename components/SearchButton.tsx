"use client"

import { addUserEmailToProduct, scrapeAndCompareCar } from '@/libs/actions';
import { useThemeContext } from '@/libs/contexts/context';
import { useCreateSearchResults, useSearchOptions, useUpdateSearchOptions, useCreateGraphData } from '@/libs/hooks';
import { NotifyData, Options, SearchResult, SearchResults } from '@/types';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Notification from './Notification';


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

// const SearchButton = ({options, setNotify, notify}: {options: Options, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>, notify: NotifyData}) => {
const SearchButton = (props: {options: Options}) => {

  const { options } = props;

  const { loading, setLoading, setNotify, notify } = useThemeContext();

  const { data } = useSearchOptions();
  const { email } = data;

  const updateSearchOptionMutation = useUpdateSearchOptions();

  const createSearchResultsMutation = useCreateSearchResults(setNotify);
  const createGraphDataMutation = useCreateGraphData();

  let cars: SearchResult[] = [];
  
  let maxTime: Date;

  const handleOnclick = async () => {

    let i = 0
    let DateCheck = true;
    
    do {
      i++
      const isValidLink = isValidOtomotoCarURL(`https://www.otomoto.pl/osobowe?page=${i}`);

      if(!isValidLink) return alert('Please provide a valid Otomoto link')

      try { 
        setLoading(true);

        const filteredCars: any = await scrapeAndCompareCar(`https://www.otomoto.pl/osobowe?page=${i}`);
      
        if (filteredCars.booleans.length === 0) {
          DateCheck = false;
        }

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
    while (DateCheck === true);

    const results: SearchResults = {
      cars: cars,
      read: false
    }

    const graphData: number = cars.length;

    if (cars.length > 0) {
      createSearchResultsMutation.mutate(results);
      createGraphDataMutation.mutate(graphData);
      await addUserEmailToProduct(cars, email);
    } else {
      setNotify({
        isOpen: true,
        message: 'No cars found',
        type: 'success'
      });
    }

    if (maxTime) {
      updateSearchOptionMutation.mutate({...options, date: maxTime})
    }
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
      <Notification
      // notify={notify}
      // setNotify={setNotify}
    />
  </>
  )
}

export default SearchButton