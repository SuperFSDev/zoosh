import React from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs'
import {MdInsertLink,MdReport} from 'react-icons/md'
import {FaFacebookF,FaTwitter} from 'react-icons/fa'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export default function ProfileURL() {

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
    <div class="dropdown2">
        <a className="dropdown2" href="#"><BsThreeDotsVertical  size={20}/></a>
        <div class="dropdown-content2">
            <a href="#" onClick={handleClickCopy}><MdInsertLink size={20} /> Copy URL</a>
            <a href="#"><FaFacebookF size={18} /> Share</a>
            <a href="#"><FaTwitter size={18}/> Share</a>            
            <a href="#" onClick={handleClickReport}><MdReport size={20}/> Report</a>
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
        message="Copied Account URL!"
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
        message="Account has been Reported"
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