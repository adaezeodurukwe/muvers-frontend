import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { useEffect } from 'react'

interface props {
  openSnackbar: boolean, message: string
}

const CustomSnackbar = ({ openSnackbar, message }: props) => {
  useEffect(() => {
    if (openSnackbar) {
      setOpen(true)
    }
  }, [openSnackbar]);


  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    message={message}
    action={
      <React.Fragment>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <Close fontSize="small" />
        </IconButton>
      </React.Fragment>
    }
  />
  )
}

export default CustomSnackbar;


export const showSnackBar = (message: string) => {
  return <CustomSnackbar openSnackbar message={message} />
}