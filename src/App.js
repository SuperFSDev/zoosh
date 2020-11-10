import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Feed from './components/Feed';
import SocsList from './components/Socs/ListSocieties';
import Leaderboard from './components/Leaderboard';
import Facebook from './components/Facebook';
import Home from './components/Home';
import CreateSociety from './components/Socs/CreateASoc';
import Trending from './components/Lists/TrendingList'
import NewSocs from './components/Lists/NewSocsList'
import JoinSocs from './components/Socs/JoinSocModal';
import Profile from './components/Profile/UserProfile'
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
              <Route path="/dailyProblems" component={Facebook}/>
              <Route path="/list-of-clubs-and-societies" component={SocsList}/>
              <Route path="/create-a-society" component={CreateSociety}/>
              <Route path="/join-a-club-or-society" component={JoinSocs}/>
              <Route path="/trending" component={Trending}/>
              <Route path="/new" component={NewSocs}/>
              <Route path="/leaderboard" component={Leaderboard}/>
              <Route path="/profile" component={Profile}/>
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
