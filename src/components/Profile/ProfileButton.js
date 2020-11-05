import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Nav, NavDropdown} from 'react-bootstrap'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import {RiStarSmileFill} from 'react-icons/ri'
import Invite from '../Common/InviteAFriend'
import Avatar from './Avatar'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Nav.Link className="l-prof-btn-default" onClick={handleClick}><Avatar/>John Doe </Nav.Link>
      {/* <RiStarSmileFill className="-i-vector-score"/>123,521 */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Nav.Link className="profile-dropdown-option" href="/profile"><StyledMenuItem>
          <ListItemText primary="My Profile"/>
        </StyledMenuItem></Nav.Link>
        <Nav.Link href="/profile"><StyledMenuItem>
          <ListItemText primary="Account Settings"/>
        </StyledMenuItem></Nav.Link>
        <StyledMenuItem>
          <Invite/>
        </StyledMenuItem>
        <NavDropdown.Divider />   
        <Nav.Link href="/login"><StyledMenuItem>
          <ListItemText primary="Logout"/>
        </StyledMenuItem></Nav.Link>
      </StyledMenu>
    </div>
  );
}