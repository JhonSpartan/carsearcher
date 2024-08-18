import Notification from '@/components/Notification';
import CarsTableServer from '@/components/CarsTableServer';
import { Suspense } from 'react';
import { LinearProgress } from '@mui/material';

const searchedCars = () => {
  
  return (
    <>
      <Suspense fallback={<LinearProgress/>}> 
        <CarsTableServer/>
      </Suspense>
      <Notification/>
    </>
  )

}

export default searchedCars