import React from 'react';
import '../App.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { FiCopy } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';

export default function Copy() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <button className="btn-copy" onClick={handleClick}>Copy <FiCopy/></button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Copied to Clipboard"
        action={
          <React.Fragment>
            <TiTick/>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}