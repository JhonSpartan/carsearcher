"use client"
 
import { Typography, Accordion, AccordionDetails, AccordionSummary, Box, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '@/components/ConfirmDialog';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {  DialogConformation, SearchResult, SearchResultsShape } from '@/types';
import { useThemeContext } from '@/libs/contexts/context';
import { deleteSearchResultsAction, updateSearchResultsAction } from '@/libs/services';

const MessagesAccordionClient = (props: {results: SearchResultsShape[]}) => {

  const  { results } = props; 

  const { dark, setNotify } = useThemeContext();

  const [confirmDialog, setConfirmDialog] = useState<DialogConformation>({isOpen: false, title: '', subTitle: '', onConfirm: () => {handleDeleteSearchResult('')}});
  const [expanded, setExpanded] = useState<string | false>('');

  const handleChange = (panel: string, item: SearchResultsShape) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    if (item.read === false) {
      updateSearchResultsAction(true, item._id);
    } else {
      return
    }
  };

  const handleDeleteSearchResult = (id: string | undefined) => {
    deleteSearchResultsAction(id);
    setExpanded(false);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    setNotify({
      isOpen: true,
      message: 'Search result successfully deleted',
      type: 'success'
    });
  }

  return (
    <>
      {results.map((item: SearchResultsShape, index: number) => (
        <Accordion 
          expanded={expanded === `panel${index}`} 
          onChange={handleChange(`panel${index}`, item)}
          key={index}
          sx={{
            border: '1px solid #00000039',
            '&:not(:last-child)': {
              borderBottom: 0,
            },
            '&::before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              bgcolor: '#00000008',
              flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-content': {
                ml: 1,
              },
              position: 'relative',
            }}
          >
            <Typography sx={{ml: 5, display: 'flex', flexDirection: {sm: 'row', xs: 'column'}}}>
              <span className="mr-3 text-gray-500">Searh results received at:</span> 
              <span> { moment(item.createdAt).format('DD/MM/YYYY | HH:mm:ss')}</span>
            </Typography>
            {item.read === false ? <FiberNewIcon sx={{color: '#ec6261', position: 'absolute', right: '10px', top: '10px'}} /> : <CheckCircleIcon sx={{color: '#83b387', position: 'absolute', right: '10px', top: '10px'}} /> }
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 2,
              borderTop: '1px solid #00000020',
              position: 'relative',
            }}
          >
              <DeleteIcon  
                sx={{
                  color: '#ec6261',
                  '&:hover': {
                    color:  '#f3a0a0',
                  },
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  cursor: 'pointer',
                  fontSize: '30px'
                }}
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true, 
                    title: 'Are you sure you want to remove this search result?', 
                    subTitle: 'You can not undo this operation',
                    onConfirm: () => {handleDeleteSearchResult(item._id)}
                  })
                }}
              />
            {item.cars.map((car: SearchResult, index: number) => (
              <>
                <Box key={index} sx={{display: 'grid', gridTemplateRows: 'minmax(0, 1fr)', gridTemplateColumns: {md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', xs: '1fr' }}}>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: 1, 
                        gridRow: 1 
                      }}
                    >
                      <span>Car manufacturer: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.manufacturer}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: 1,
                        gridRow: 2
                        }}
                    >
                      <span>Car model: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.model}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: 1,
                        gridRow: 3
                      }}
                    >
                      <span>Car transmission: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.transmission}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: 1,
                        gridRow: 4
                      }}
                    >
                      <span>Fuel type: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.fuelType}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {sm: 2, xs: 1},
                        gridRow: {sm: 1, xs: 5},
                        }}
                    >
                      <span>Year of production: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.yearOfProduction}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {sm: 2, xs: 1},
                        gridRow: {sm: 2, xs: 6},
                      }}
                    >
                      <span>Car drive: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.carDrive}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {sm: 2, xs: 1},
                        gridRow: {sm: 3, xs: 7},
                      }}
                    >
                      <span >Car type: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.carType}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {md: '2/4', sm: 2, xs: 1},
                        gridRow:  {md: 4, sm: '5/7', xs: 11},
                      }}
                    >
                    <span>Car link: </span> 
                    <Link href={car.generation} target="_blank">
                      <span className="text-blue-500">{car.carLink}</span>
                    </Link>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {md: 3, sm: 1, xs: 1},
                        gridRow:  {md: 1, sm: 5, xs: 8},
                      }}
                    >
                      <span>Doors count: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.doorsCount}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {md: 3, sm: 1, xs: 1},
                        gridRow:  {md: 2, sm: 6, xs: 9},
                      }}
                    >
                      <span>Places count: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.placesCount}</span>
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1,
                        gridColumn: {md: 3, sm: 2, xs: 1},
                        gridRow:  {md: 3, sm: 4, xs: 10},
                      }}
                    >
                      <span>Generation: </span> 
                      <span className={dark ? "text-blue-950" : "font-semibold"}>{car.generation}</span>
                    </Typography>
                </Box>
                <Divider sx={{mt: 3, mb: 3}}/>
              </>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>
  )
}

export default MessagesAccordionClient