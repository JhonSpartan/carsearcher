
import {Box, Drawer, List, ListItem, Divider, ListItemButton, ListItemIcon, ListItemText, Typography, Tooltip, Avatar, IconButton} from '@mui/material'
import { Dashboard, DirectionsCar, Email, Logout } from '@mui/icons-material';
import MessageIcon from '@mui/icons-material/Message';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetSearchResults } from '@/libs/hooks';
import { useThemeContext } from '@/libs/contexts/context';

const drawerWidth = {
  full: 240,
  icons: 100,
}

const SideBar = () => {

  const navLinks = [
    {title: 'Main', icon: <Dashboard/>, path:'/'},
    {title: 'Searched cars', icon: <DirectionsCar/>, path:'/searchedCars'},
    {title: 'Messages', icon: <MessageIcon/>, path:'/messages'}
  ]

  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const { dark } = useThemeContext();

  const { isLoading, error, data} = useGetSearchResults();

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{JSON.stringify(error)}</h1>

  const results = data.searchresults;

  let counter = 0;

  for (let item of results) {
    if (item.read === false) {
      counter++
    }
  } 

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: { lg: drawerWidth.full, xs: drawerWidth.icons},
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: { lg: drawerWidth.full, xs: drawerWidth.icons}, boxSizing: 'border-box' },
        }}
      >
       <Box sx={{ mx: 'auto', mt: 10, mb: 1 }}>
          <Tooltip title="John Smith">
            <Avatar
              src="/user.png"
              sx={{
                width: {xl: 100, xs: 50},
                height: {xl: 100, xs: 50}
              }}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography>John Smith</Typography>
          <Typography variant="body2">Admin</Typography>
          <Typography variant="body2" sx={{display: {lg: 'block', xs: 'none'}}}>useremail@gmail.com</Typography>
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <List sx={{mt: 2}}>
          {navLinks.map((item, index) => {
            return(
            <ListItem 
              key={index} 
              disablePadding 
              sx={{mb: .5}}
            >
              <Link
                href={item.path}
                className={isActive(item.path) ? `${dark ? 'bg-slate-800 w-full' : 'bg-slate-200 w-full'}` : 'w-full'} 
              >
                <ListItemButton sx={{display: 'flex', justifyContent: {xl: 'unset', xs: 'center'}}}>
                  <ListItemIcon sx={{position: 'relative', display: {lg: 'block', xs: 'flex'}, justifyContent: {xl: 'unset', xs: 'center'}}}>
                    {item.icon}
                    { item.path === '/messages' ? <div className={counter === 0 ? "invisible visible w-5 h-5 bg-red-500 text-white rounded-full flex justify-center items-center text-xs z-10 absolute xl:left-1/4 xs:left-1/2 top-1/2" : "visible w-5 h-5 bg-red-500 text-white rounded-full flex justify-center items-center text-xs z-10 absolute xl:left-1/4 xs:left-1/2 top-1/2"}>{counter}</div> : <></>}

                  </ListItemIcon>
                  <ListItemText primary={item.title} sx={{display: {lg: 'block', xs: 'none'}}} />
                </ListItemButton>
              </Link>
            </ListItem>
            );
          })}
        </List> 
        </Drawer>
      </>
  )
}

export default SideBar