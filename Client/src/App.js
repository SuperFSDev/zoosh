import React from 'react';
import './assets/App.css';
import './assets/Media.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NotFoundPage from './components/404/NotFoundPage';
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import SocsList from './components/Socs/ListSocieties';
import Leaderboard from './components/Pages/Leaderboard';
import CreateSociety from './components/Socs/CreateASoc';
import Profile from './components/Profile/MyProfile'
import ViewProfile from './components/Profile/UserProfile'
import DiscussionPost from './components/Pages/UniquePages/DiscussionPost'
import Forums from './components/Pages/Forum'
import NavBar from './components/Navbar'
import CommunityPage from './components/Pages/UniquePages/CommunityPage'
import AccountSettings from './components/Profile/AccountSettings'
import UserConnections from './components/Pages/UserConnections'
import Landing from './components/Pages/Landing/Landing'
import Users from './components/Pages/Users'
import NewPost from './components/Pages/NewPost'
import ReadingList from './components/Pages/ReadingList'
import Following from './components/Pages/FollowingLayout';
import TopPosts from './components/Pages/AllPosts';
import PreNavbar from './components/PreNavbar';

class App extends React.Component {
  render(){
    const DefaultRoutes = () => {
      return(
        <div>
          <Router> 
            <NavBar/>   
            <Switch>
              <Route path="/communities" component={SocsList}/>
              <Route path="/create-a-society" component={CreateSociety}/>
              <Route path="/settings" component={AccountSettings}/>
              <Route path="/settings/profile" component={AccountSettings}/>
              <Route path="/d" component={DiscussionPost}/>
              <Route path="/connections" component={UserConnections}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/u" component={ViewProfile}/>
              <Route path="/users" component={Users}/>
              <Route path="/new" component={NewPost}/>
              <Route path="/home" component={Following}/> 
              <Route path="/saved" component={ReadingList}/>
              <Route path="/me" component={Profile}/>
              <Route path="/forum" component={Forums}/>
              <Route path="/c" component={CommunityPage}/>
              {/* <Route path="/home" component={AllPosts}/> */}
              <Route exact path="/" component={Following}/>
              <Route path="/top" component={TopPosts}/>

              {/* 404 Not Found Exception */}
              <Router>
                <Switch>
                    <Route exact path='/' component={Following} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
              </Router>    



            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <Router>
        {/* <PreNavbar/>    */}
        <Switch>
          <Route path="/landing" component={Landing}/>
          <Route path="/join" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>

          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;

