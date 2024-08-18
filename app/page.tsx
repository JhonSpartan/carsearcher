import SearchButton from '@/components/SearchButton';
import { Box, List, Paper, Typography, Divider, ListItem, LinearProgress } from '@mui/material';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPostOfficeTwoToneIcon from '@mui/icons-material/LocalPostOfficeTwoTone';
import AddEmail from '@/components/AddEmail';
import SwitchLocation from '@/components/SwitchLocation';
import moment from 'moment';
import SearchDatePicker from '@/components/SearchDatePicker';
import Notification from '@/components/Notification';
import { Options } from '@/types';
import { Suspense } from 'react';
import TestButton from '@/components/TestButton';
import ChartServer from '@/components/ChartServer';

const URL = '';

async function getOptions() {

  const res = await fetch(`carsearcher-proba.vercel.app/api/searchOptions`, {
    cache: "no-cache",
    next: {
      tags: ["options"]
    }
  });
  const searchOptionsData = await res.json();
  const options: Options = searchOptionsData.searchoptions[0];
  return options;
}

const page = async () => {

  const options = await getOptions();
  const transformedDate = moment(options.date).format('DD/MM/YYYY | HH:mm:ss');

  return (
    <Box component="main"
      sx={{
        width: '100%',
        overflow: 'hidden',
        height: {xl: '100vh', mobile: '100%'},
        pb: 11
      }}
    >
      <Box
        sx={{
          mt: 10,
          mx: 2,
          display: 'grid',
          columnGap: 2,
          rowGap: 2,
          gridTemplateRows: {xl: '100px 1fr', mobile: '260px, 1fr', xs: '1fr'},
          gridTemplateColumns: {xl: 'repeat(4, 1fr)', sm: 'repeat(3, 1fr)', mobile: 'repeat(2, 1fr)', xs: '1fr'},
          height: '100%'
        }}
      >
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            gridColumn: 1, 
            gridRow:{xl: 1,  xs: 2}, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: {md: 'row', mobile: 'column'},
          }}
        >
          <LocalPostOfficeTwoToneIcon sx={{ height: 55, width: 55, opacity: 0.3, mr: 1, fill: "#8e63e1" }} />
          <Divider orientation="vertical" sx={{mr: 2, display: {md: 'block', mobile: 'none'}}} />
          <Box
            sx={{
              display: 'flex',
              alignItems: {mobile: 'center', md: 'start'},
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{fontSize: {xs: 16, mobile: 14, lg: 16}, color: 'grey'}}>Current email</Typography>
            <Divider flexItem />
            <Typography variant="h6" sx={{fontWeight: 'bold', fontSize: {xs: 18, mobile: 15, lg: 18}}}>{options.email}</Typography>
          </Box>
        </Paper>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            gridColumn: {mobile: 2, xs: 1}, 
            gridRow:{xl: 1,  mobile: 2, xs: 3}, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: {md: 'row', mobile: 'column'},
          }}>
          <LocationOnTwoToneIcon sx={{ height: 55, width: 55, opacity: 0.3, mr: 1, fill: '#45b9fd'}} />
          <Divider orientation="vertical" sx={{mr: 2, display: {md: 'block', mobile: 'none'}}} />
          <Box
            sx={{
              display: 'flex',
              alignItems: {mobile: 'center', md: 'start'},
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{fontSize: {xs: 16, mobile: 14, lg: 16}, color: 'grey'}}>Search location</Typography>
            <Divider flexItem />
            <Typography variant="h6" sx={{fontWeight: 'bold', fontSize: {xs: 18, mobile: 15, lg: 18}}}>{options.location}</Typography>
          </Box>
        </Paper>
        <Paper 
            elevation={1} 
          sx={{ 
            p: 2, 
            gridColumn: {sm: 3, mobile: 1}, 
            gridRow: {xl: 1, sm: 2,  mobile: 3, xs: 4}, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: {md: 'row', mobile: 'column'},
          }}>
            <AccessTimeTwoToneIcon sx={{ height: 55, width: 55, opacity: 0.3, mr: 1, fill: '#fe8853' }} />
          <Divider orientation="vertical" sx={{mr: 2, display: {md: 'block', mobile: 'none'}}} />
          <Box
            sx={{
              display: 'flex',
              alignItems: {mobile: 'center', md: 'start'},
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" sx={{fontSize: {xs: 16, mobile: 14, lg: 16}, color: 'grey'}}>Last search session time</Typography>
            <Divider flexItem />
            <Typography variant="h6" sx={{fontWeight: 'bold', fontSize: {xs: 18, mobile: 15, lg: 18}}}>{transformedDate}</Typography>
          </Box>
        </Paper>
        <Paper elevation={1} sx={{p:2, gridColumn: {xl: 4, mobile: '1/4', xs: 1}, gridRow:{xl: '1/3', xs: 1}, minHeight: {xs: '430px', mobile: 'unset'}}}>
          <Box
            sx={{
              width: '100%',
              height: '100%'
            }}
          >
            
            <Typography variant="h6" sx={{textAlign: 'center', mb: 1}}>Search settings</Typography>
            <Divider />
            <List
              sx={{
                height: {xl: '100%', mobile: 'auto', xs: '100%'},
                display: {xl: 'flex', mobile: 'grid', xs: 'flex'},
                flexDirection: {xl: 'column', xs: 'column', mobile: 'unset'},
                justifyContent: {xl: 'space-evenly', xs: 'space-evenly', mobile: 'unset'},
                columnGap: {xl: 'unset', mobile: 2, xs: 'unset'},
                rowGap: {xl: 'unset', mobile: 2, xs: 'unset'},
                gridTemplateRows: {xl: 'unset', mobile: '1fr', xs: 'unset'},
                gridAutoColumns: {xl: 'unset', mobile: 'minmax(0, 1fr)', xs: 'unset'},

              }}
            >
              <ListItem sx={{gridRow: {xl: 'unset', mobile: 1, xs: 'unset'}, gridColumn: {xl: 'unset', mobile: 1, xs: 'unset'}}}>
                <AddEmail />
              </ListItem>
              <Divider sx={{display: {xl: 'block', mobile: 'none', xs: 'block'}}}/>
              <ListItem sx={{gridRow: {xl: 'unset', tablet: 1, mobile: 2, xs: 'unset'}, gridColumn: {xl: 'unset', tablet: 2, mobile: '1/3', xs: 'unset'}}}>
                <SwitchLocation />
              </ListItem>
              <Divider sx={{display: {xl: 'block', mobile: 'none', xs: 'block'}}}/>
              <ListItem sx={{gridRow: {xl: 'unset', mobile: 1, xs: 'unset'}, gridColumn: {xl: 'unset', tablet: 3, mobile: 2, xs: 'unset'}}}>
                <SearchDatePicker />
              </ListItem>
              <Divider sx={{display: {xl: 'block', mobile: 'none', xs: 'block'}}}/>
              <ListItem sx={{gridRow: {xl: 'unset', tablet: 2, mobile: 3, xs: 'unset'}, gridColumn: {xl: 'unset', tablet: '1/4', mobile: '1/3', xs: 'unset'}}}>
                <SearchButton
                  options={options}
                />
                <TestButton />
              </ListItem>
            </List>
          </Box>
        </Paper>
        <Paper elevation={1} 
          sx={{
            p:2, 
            gridColumn: {xl: '1/4', mobile: '1/4'}, 
            gridRow:{xl: '2/3', mobile: '4/5'}, 
            maxHeight: {lg: '500px', sm: '450px', mobile: '400px'}, 
          }}>
          <Suspense fallback={<LinearProgress/>}>
            <ChartServer  />   
          </Suspense>
        </Paper>
      </Box>
      <Notification/>
    </Box>
  )
}

export default page