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
import Profile from './components/Profile/UserProfile'
import ForumPost from './components/Pages/ForumPost'
import Forums from './components/Pages/Forum'
import Events from './components/Pages/Events'
import InfoPage from './components/Pages/InfoPage'
import NavBar from './components/Navbar'

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
              <Route path="/new" component={NewSocs}/>
              <Route path="/forum-post" component={ForumPost}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/information" component={InfoPage}/>

              <Route path="/profile" component={Profile}/>
              <Route path="/events" component={Events}/>
              <Route path="/forum" component={Forums}/>

              <Route path="/" component={Feed}/>

            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path="/register" component={RegisterPage}/>
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
