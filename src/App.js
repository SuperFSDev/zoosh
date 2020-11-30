import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './components/auth/Login';
import RegisterPage from './components/auth/Register';
import Feed from './components/Pages/Feed';
import SocsList from './components/Socs/ListSocieties';
import Leaderboard from './components/Pages/Leaderboard';
import CreateSociety from './components/Socs/CreateASoc';
import Profile from './components/Profile/MyProfile'
import ViewProfile from './components/Profile/UserProfile'
import DiscussionPost from './components/Pages/DiscussionPost'
import Forums from './components/Pages/Forum'
import Discussions from './components/Pages/Discussions'
import Events from './components/Pages/Events'
import ForumPage from './components/Pages/ForumPage'
import NavBar from './components/Navbar'
import CommunityPage from './components/Pages/CommunityPage'
import AccountSettings from './components/Profile/AccountSettings'
import UserConnections from './components/Pages/UserConnections'
import GlobalPost from './components/Pages/GlobalPost'
import EventPage from './components/Pages/EventsPage'

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
              <Route path="/discussions" component={Discussions}/>
              <Route path="/settings" component={AccountSettings}/>
              <Route path="/settings/profile" component={AccountSettings}/>
              <Route path="/d" component={DiscussionPost}/>
              <Route path="/p" component={GlobalPost}/>
              <Route path="/e" component={EventPage}/>
              <Route path="/connections" component={UserConnections}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/me" component={Profile}/>
              <Route path="/u" component={ViewProfile}/>
              <Route path="/s" component={CommunityPage}/>
              <Route path="/events" component={Events}/>
              <Route path="/forums" component={Forums}/>
              <Route path="/f" component={ForumPage}/>
              <Route path="/home" component={Feed}/>
              <Route exact path="/" component={Feed}/>


            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path="/join" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;

