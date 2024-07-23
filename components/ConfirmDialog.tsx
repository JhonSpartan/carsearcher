import { DialogConformation } from '@/types';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"


const ConfirmDialog = (props: {confirmDialog: DialogConformation, setConfirmDialog: React.Dispatch<React.SetStateAction<DialogConformation>>}) => {

  

  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog 
      open={confirmDialog.isOpen}
      sx={{
        position: 'absolute',
        top: '-30%'
      }}
    >
      <DialogTitle sx={{textAlign: 'center'}}>
        <IconButton disableRipple>
          <NotListedLocationIcon 
            sx={{
              fontSize: '8rem',
              background: '#ffe4e6',
              color: '#ff474e',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
        }}
      >
        <Button 
          variant="contained" 
          color="success"
          onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}
        >
          No
        </Button>
        <Button 
          variant="contained" 
          color="error"
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog