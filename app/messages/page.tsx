import { Container, LinearProgress } from '@mui/material'
import Notification from '@/components/Notification';
import { Suspense } from 'react';
import MessagesAccordionServer from '@/components/MessagesAccordionServer';

const messages = async () => {

  return (
    <>
      <Container
        component="main" 
        sx={{
          width: '100%',
          overflowX: 'hidden',
          pb: 11,
          mt: 15
        }} 
      >
        <Suspense fallback={<LinearProgress/>}>
          <MessagesAccordionServer />   
        </Suspense>
      </Container>
      <Notification/>
      
    </>
  )
}
  export default messages;