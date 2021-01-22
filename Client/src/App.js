import React from 'react';
import './assets/App.css';
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
import DiscussionPost from './components/Pages/UniquePages/DiscussionPost'
import Forums from './components/Pages/Forum'
import Discussions from './components/Pages/Discussions'
import Events from './components/Pages/Events'
import ForumPage from './components/Pages/UniquePages/ForumPage'
import NavBar from './components/Navbar'
import CommunityPage from './components/Pages/UniquePages/CommunityPage'
import AccountSettings from './components/Profile/AccountSettings'
import UserConnections from './components/Pages/UserConnections'
import GlobalPost from './components/Pages/UniquePages/GlobalPost'
import EventPage from './components/Pages/UniquePages/EventsPage'
import Podcasts from './components/Pages/Podcasts';
import PodcastPage from './components/Pages/UniquePages/PodcastPage';
import Landing from './components/Pages/Landing/Landing'
import Manifesto from './components/Pages/Landing/Manifesto'
import Contact from './components/Pages/Landing/Contact'
import Two from './components/Pages/Two'
import Users from './components/Pages/Users'
import Listings from './components/Pages/Listings'
import NewPost from './components/Pages/NewPost'
import ReadingList from './components/Pages/ReadingList'

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
              <Route path="/pod" component={PodcastPage}/>
              <Route path="/e" component={EventPage}/>
              <Route path="/connections" component={UserConnections}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/u" component={ViewProfile}/>
              <Route path="/events" component={Events}/>
              <Route path="/podcasts" component={Podcasts}/>
              <Route path="/twooo" component={Two}/>
              <Route path="/users" component={Users}/>
              <Route path="/listings" component={Listings}/>
              <Route path="/new" component={NewPost}/>
              <Route path="/saved" component={ReadingList}/>

              <Route path="/forums" component={Forums}/>
              <Route path="/f" component={ForumPage}/>
              <Route path="/home" component={Discussions}/>
              <Route exact path="/" component={Discussions}/>
              <Route path="/following" component={Feed}/>



            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path="/me" component={Profile}/>
          <Route path="/u" component={ViewProfile}/>
          <Route path="/c" component={CommunityPage}/>
          <Route path="/join" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/landing" component={Landing}/>
          <Route path="/manifesto" component={Manifesto}/>
          <Route path="/contact" component={Contact}/>

          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;

