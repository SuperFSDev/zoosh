import React from 'react';
import './assets/App.css';
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
import Events from './components/Pages/Events'
import NavBar from './components/Navbar'
import CommunityPage from './components/Pages/UniquePages/CommunityPage'
import AccountSettings from './components/Profile/AccountSettings'
import UserConnections from './components/Pages/UserConnections'
import EventPage from './components/Pages/UniquePages/EventsPage'
import Podcasts from './components/Pages/Podcasts';
import PodcastPage from './components/Pages/UniquePages/PodcastPage';
import Landing from './components/Pages/Landing/Landing'
import Contact from './components/Pages/Landing/Contact'
import Users from './components/Pages/Users'
import Listings from './components/Pages/Listings'
import NewPost from './components/Pages/NewPost'
import ReadingList from './components/Pages/ReadingList'
import Following from './components/Pages/FollowingLayout';
import TopPosts from './components/Pages/AllPosts';
import Questions from './components/Pages/Questions';
import QuestionPage from './components/Pages/UniquePages/QuestionPage';

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
              <Route path="/pod" component={PodcastPage}/>
              <Route path="/e" component={EventPage}/>
              <Route path="/connections" component={UserConnections}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/u" component={ViewProfile}/>
              <Route path="/events" component={Events}/>
              <Route path="/podcasts" component={Podcasts}/>
              <Route path="/users" component={Users}/>
              <Route path="/listings" component={Listings}/>
              <Route path="/new" component={NewPost}/>
              <Route path="/home" component={Following}/> 
              <Route path="/saved" component={ReadingList}/>
              <Route path="/me" component={Profile}/>
              <Route path="/forums" component={Forums}/>
              <Route path="/q" component={QuestionPage}/>
              <Route path="/c" component={CommunityPage}/>
              {/* <Route path="/home" component={AllPosts}/> */}
              <Route exact path="/" component={Following}/>
              <Route path="/top" component={TopPosts}/>
              <Route path="/questions" component={Questions}/>


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
        <Switch>
          <Route path="/join" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/landing" component={Landing}/>
          <Route path="/contact" component={Contact}/>

          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;

