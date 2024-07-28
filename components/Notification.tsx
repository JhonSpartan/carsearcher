import { Alert, IconButton, Snackbar } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { NotifyData } from "@/types";
import { useThemeContext } from "@/libs/contexts/context";


// const Notification = ({ notify, setNotify }: {notify: NotifyData, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>}) => {
const Notification = () => {

  const { notify, setNotify } = useThemeContext();


  const handleClose = (event: React.SyntheticEvent | Event, reason: string) => {
    if ( reason === 'clickaway') {
      return;
    }

    setNotify({
      ...notify,
      isOpen: false
    })
  }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      sx={{
        mt: 5.4
      }}
    >
      <Alert 
        severity={notify.type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setNotify({
                ...notify,
                isOpen: false
              })
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {notify.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification