import { IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";


const CustomSnackbar = () => {
  const [open, setOpen] = useState(false);
  const { error } = useSelector(({ error }: RootStateOrAny) => error);

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setOpen(false);
  };
  return error ? ( 
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={error.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  ) : null;
};

export default CustomSnackbar;
