"use client"

import {AppBar, Toolbar, Typography, IconButton, Divider} from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Image from 'next/image';
import { useThemeContext } from '@/libs/contexts/context';
import { useLocalStorage } from '@/libs/hooks';
import { useEffect } from 'react';

const MainPage = () => {

const { dark, setDark } = useThemeContext();

const { setItem } = useLocalStorage('value');

useEffect(() => {
  setItem(dark);
}, [dark]);

  return (
    <>
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>    
            <Image
              src='/carwheel.png'
              alt='logo'
              width={40}
              height={40}
              className='object-contain'
            />
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1, ml: 1.5}}>
              CAR SEARCHER
            </Typography>
            <Divider orientation="vertical" />
          <IconButton onClick={() => setDark(!dark)}>
            {dark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MainPage