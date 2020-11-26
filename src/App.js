import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import Feed from './components/Pages/Feed';
import SocsList from './components/Socs/ListSocieties';
import Leaderboard from './components/Pages/Leaderboard';
import CreateSociety from './components/Socs/CreateASoc';
import Trending from './components/Lists/TrendingList'
import NewSocs from './components/Lists/NewSocsList'
import JoinSocs from './components/Socs/JoinSocModal';
import Profile from './components/Profile/MyProfile'
import ViewProfile from './components/Profile/UserProfile'
import DiscussionPost from './components/Pages/DiscussionPost'
import Forums from './components/Pages/Forum'
import Discussions from './components/Pages/Discussions'
import Events from './components/Pages/Events'
import InfoPage from './components/Pages/InfoPage'
import ForumPage from './components/Pages/ForumPage'
import NavBar from './components/Navbar'
import CommunityPage from './components/Pages/CommunityPage'
import AccountSettings from './components/Profile/AccountSettings'

class App extends React.Component {
  render(){
    const DefaultRoutes = () => {
      return(
        <div>
          <Router> 
            <NavBar/>   
            <Switch>
              {/* <Route exact path="/feed" component={Feed}/> */}
              <Route path="/list-of-clubs-and-societies" component={SocsList}/>
              <Route path="/create-a-society" component={CreateSociety}/>
              <Route path="/join-a-club-or-society" component={JoinSocs}/>
              <Route path="/trending" component={Trending}/>
              <Route path="/discussions" component={Discussions}/>
              <Route path="/settings" component={AccountSettings}/>
              <Route path="/settings/profile" component={AccountSettings}/>
              <Route path="/new" component={NewSocs}/>
              <Route path="/d" component={DiscussionPost}/>
              <Route path="/l" component={Leaderboard}/>
              {/* <Route path="/s" component={InfoPage}/> */}
              <Route path="/me" component={Profile}/>
              <Route path="/u" component={ViewProfile}/>
              <Route path="/s" component={CommunityPage}/>
              <Route path="/events" component={Events}/>
              <Route path="/forums" component={Forums}/>
              <Route path="/f" component={ForumPage}/>
              <Route path="/home" component={Feed}/>

            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path="/join" component={RegisterPage}/>
          {/* <Route path="/" component={LoginPage}/> */}
          <Route path="/login" component={LoginPage}/>
          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;
const rootElement = document.getElementById("root");
