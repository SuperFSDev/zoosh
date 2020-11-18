import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Nav, NavDropdown} from 'react-bootstrap'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import DarkMode from '../Common/Darkmode'
import Avatar from '@material-ui/core/Avatar';
import Img from '../../images/blogging.jpg'

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
  var user = JSON.parse(localStorage.getItem('user'));
  if(user)
    var fullname = user.fullname;
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('usertoken');
  };

  return (
    <div>
      <div id="#battleBox">
        <Nav.Link className="l-prof-btn-default" onClick={handleClick}>
            <Avatar src={Img} className="profile-btn-wrapper-left"/>
            <b className="user-score-prof-btn">1,231</b>
        </Nav.Link>
      </div>
      
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Nav.Link className="profile-dropdown-option" href="/profile"><StyledMenuItem>
          <ListItemText>Hello {fullname}!</ListItemText>
        </StyledMenuItem></Nav.Link>
        <Nav.Link className="profile-dropdown-option" href="/profile"><StyledMenuItem>
          <ListItemText>Following 10</ListItemText>
        </StyledMenuItem> </Nav.Link>
        <Nav.Link className="profile-dropdown-option" href="/profile"><StyledMenuItem>
          <ListItemText>Account Settings</ListItemText>
        </StyledMenuItem></Nav.Link>
        <Nav.Link className="profile-dropdown-option" href="/profile"><StyledMenuItem>
          <ListItemText>Invite a Friend</ListItemText>
        </StyledMenuItem></Nav.Link>
        <StyledMenuItem>
          <ListItemText primary={<DarkMode/>}/>
        </StyledMenuItem>
        <NavDropdown.Divider />   
        <Nav.Link href="/login" onClick={handleLogout}><StyledMenuItem>
          <ListItemText primary="Logout"/>
        </StyledMenuItem></Nav.Link>
      </StyledMenu> 
    </div>
  );
}