"use client"

import { Button, InputAdornment, LinearProgress, Paper, TextField, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { Suspense, useState } from 'react';
import Popup from '@/components/controls/Popup';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { TableCell, TableRow, TableBody } from "@mui/material";
import AddForm from '@/components/form/AddForm';
import EditCar from '@/components/EditCar';
import ConfirmDialog from '@/components/ConfirmDialog';
import { CarShape, DialogConformation, NotifyData } from '@/types';
import { useThemeContext } from '@/libs/contexts/context';
import { headCells } from '@/constants';
import CarsTableFunctionality from '@/components/CarsTableFunctionality';
import { deleteCarAction } from '@/libs/services';


const CarsTableClient = (props: {cars: CarShape[]}) => {
  const [filterFn, setFilterFn] = useState<any>({fn: (items: CarShape[]) => {return items}});
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [form, setForm] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [confirmDialog, setConfirmDialog] = useState<DialogConformation>({isOpen: false, title: '', subTitle: '', onConfirm: () => {handleDeleteCar('')}});
  const [shrink, setShrink] = useState<boolean>(false);

  const { dark, setNotify } = useThemeContext();

  const { cars } = props;

  const {
    TblContainer,
    TblHead,
    TblPagination,
    carsAfterPagingAndSorting,
  } = CarsTableFunctionality(headCells, filterFn);

  const handleSearch = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let target = e.target;
    setFilterFn({
      fn: (items: CarShape[]) => {
        if(target.value == '') {
          return items;
        }
        else {
          return items.filter((item: CarShape) => item.manufacturer.toLowerCase().includes(target.value.toLowerCase()))
        }
      }
    })
  }

  const handleAddForm = () => {
    setForm('addForm')
    setOpenPopup(true)
  }

  const handleEditForm = (id:string) => {
    setForm('editForm')
    setId(id)
    setOpenPopup(true)
  }

  const handleDeleteCar = (id: string) => {
    deleteCarAction(id);
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    setNotify({
      isOpen: true,
      message: 'Car successfully deleted',
      type: 'success'
    });
  } 

  return (
    <>
      <Paper
        sx={{
          mt: 15,
          mx: 2,
          mb: 1,
          width: '100%',
          overflowX: {xs: 'auto', xl: 'unset'},
          '&::-webkit-scrollbar': {
            width:  '10px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: `${dark ? '#1e293b' : '#e1e4f3'}`,
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: `${dark ? '#151c29' : '#d0d6f2'}`,

          },
          '&::-webkit-scrollbar-thumb: hover': {
            bgcolor: `${dark ? '#121823' : '#bbc4ed'}`,
          },
        }}
      >
        <Toolbar sx={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
          <TextField
            label="Search cars"
            variant="outlined"
            type="text"
            size="small"
            sx={(theme) => ({
              '& .Mui-focused .MuiInputAdornment-root': {
                color: theme.palette.primary.main,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                px: 5.5
              },
              width: '25%',
              minWidth: '250px',
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onFocus={() => setShrink(true)}
            onBlur={(e) => setShrink(!!e.target.value)}
            InputLabelProps={{ sx: { ml: 4.5 }, shrink }}
            onChange={handleSearch}
          />
          <Button 
            variant="outlined"
            size="medium"
            color="primary"
            onClick={handleAddForm}

            sx={{
              mt: {mobile: 0, xs: 1},
              mb: {mobile: 0, xs: 1},
            }}
          >
            <AddIcon 
              sx={{mr: {xs: 0, mobile: .5}}}
            />
            <Typography sx={{display: {xs: 'none', mobile: 'block'}}}>Add new</Typography>
          </Button>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {
              carsAfterPagingAndSorting(cars).map((item: any, index: number) => 
                (<TableRow 
                  key={index}
                  sx={{
                    '&:hover': {
                      bgcolor: `${dark ? '#2e2e2e' : '#fffbf2'}`,
                      cursor: 'pointer',
                    }
                  }}
                >
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.fuelType}</TableCell>
                  <TableCell>{item.transmission}</TableCell>
                  <TableCell>{item.yearOfProduction}</TableCell>
                  <TableCell>{item.carDrive}</TableCell>
                  <TableCell>{item.carType}</TableCell>
                  <TableCell>{item.generation}</TableCell>
                  <TableCell>{item.placesCount}</TableCell>
                  <TableCell>{item.doorsCount}</TableCell>
                  <TableCell>
                    <BorderColorIcon 
                      fontSize="small"
                      sx={{
                        color: '#7eaf81', 
                        '&:hover': {
                          color:  '#adccaf',
                        }, 
                        fontSize: '25px', 
                        mr: 1.5
                      }}
                      onClick={() => {handleEditForm(item._id)}}

                    />
                    <DeleteIcon 
                      sx={{
                        color: '#ec6261',
                        '&:hover': {
                          color:  '#f3a0a0',
                        }, 
                        fontSize: '25px'
                      }}
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true, 
                          title: 'Are you sure you want to remove the car?', 
                          subTitle: 'You can not undo this operation',
                          onConfirm: () => {handleDeleteCar(item._id)}
                        })
                      }}
                    />
                  </TableCell>
                </TableRow>)
              )
            }
          </TableBody>
        </TblContainer>
        <TblPagination 
          cars={cars}
        />
      </Paper>
      <Popup
        title={form === 'addForm' ? "Car add form" : "Car edit form"} 
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >   
        {
          form==='addForm' ? 
           
          <AddForm setOpenPopup={setOpenPopup} /> :
     
          <Suspense fallback={<LinearProgress/>}> 
            <EditCar id={id} setOpenPopup={setOpenPopup} /> 
          </Suspense>
        }
      </Popup>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </>

  )

}

export default CarsTableClient