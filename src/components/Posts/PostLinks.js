import React from 'react';
import {BsThreeDots} from 'react-icons/bs'
import {MdInsertLink,MdReport} from 'react-icons/md'
import {FaFacebookF,FaTwitter} from 'react-icons/fa'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default function PostLinks() {

    const [open, setOpen] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);


    const handleClickCopy = () => {
      setOpen(true);
    };
  
    const handleCloseCopy = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleClickReport = () => {
        setOpenReport(true);
      };
    
      const handleCloseReport = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenReport(false);
      };
  


  return (
    <>
    {/* Dropdown URL links */}
    <div class="dropdown2">
        <a className="dropdown2" href="#"><BsThreeDots  size={20}/></a>
        <div class="dropdown-content2">
            <a href="#" onClick={handleClickCopy}><MdInsertLink size={20} /> Copy Post</a>
            <a href="#" onClick={handleClickReport}><MdReport size={20}/> Report Post</a>
        </div>
    </div>

    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseCopy}
        message="Copied Post to clipboard!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseCopy}>
            </IconButton>
          </React.Fragment>
        }
      />

    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openReport}
        autoHideDuration={6000}
        onClose={handleCloseReport}
        message="Post has been Reported"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseReport}>
            </IconButton>
          </React.Fragment>
        }
      />
        
    </>
  );
}