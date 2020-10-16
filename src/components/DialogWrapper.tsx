import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogWrapper = ({ children, open, title, handleClose }) => {

  return (
    <div>
      <Dialog
        PaperProps={{
          style: {
            width: "35rem",
            height: "25rem"
          }
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
      </Dialog>
    </div>
  );
}

export default DialogWrapper 