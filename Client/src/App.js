import React, {lazy, Suspense} from 'react';
import './assets/App.css';
import './assets/Media.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import loadable from '@loadable/component'


const Landing = lazy(() => import('./components/Pages/Landing/Landing'));
const NavBar = lazy(() => import('./components/Navbar'));
const RegisterPage = lazy(() => import('./components/auth/Login'));
const LoginPage = lazy(() => import('./components/auth/Register'));
const NotFoundPage = lazy(() => import('./components/404/NotFoundPage'));

const TopPosts = lazy(() => import('./components/Pages/AllPosts'));
const Following = lazy(() => import('./components/Pages/FollowingLayout'));
const Users = loadable(() => import('./components/Pages/Users'));
const Profile = loadable(() => import('./components/Profile/MyProfile'));
const NewPost = lazy(() => import('./components/Pages/NewPost'));
const ReadingList = loadable(() => import('./components/Pages/ReadingList'));
const Forums = loadable(() => import('./components/Pages/Forum'));
const ViewProfile = loadable(() => import('./components/Profile/UserProfile'));
const CommunityPage = lazy(() => import('./components/Pages/UniquePages/CommunityPage'));
const AccountSettings = loadable(() => import('./components/Profile/AccountSettings'));
const Communities = lazy(() => import('./components/Socs/ListSocieties'));
const DiscussionPost = loadable(() => import('./components/Pages/UniquePages/DiscussionPost'));
const Leaderboard = loadable(() => import('./components/Pages/Leaderboard'));
const Connections = loadable(() => import('./components/Pages/UserConnections'));



class App extends React.Component {
  render(){
    
    const DefaultRoutes = () => {
      return(
        <div>            
         <Suspense fallback={<></>}>
          <Router> 
            <NavBar/>   
            <Switch>
                <TopPosts path="/top"/>
                <Following exact path="/"/>
                <Users exact path="/users"/>
                <Profile exact path="/me"/>
                <NewPost exact path="/new"/>
                <ReadingList exact path="/saved"/>
                <Forums exact path="/forums"/>
                <ViewProfile exact path="/u"/>
                <CommunityPage exact path="/c"/>
                <AccountSettings exact path="/settings"/>
                <Communities exact path="/communities"/>
                <DiscussionPost exact path="/d"/>
                <Leaderboard exact path="/leaderboard"/>
                <Connections exact path="/connections"/>

              {/* 404 Not Found Exception */}
              <Router>
                <Switch>
                  <NotFoundPage  path="*"/>
                </Switch>
              </Router>    

            </Switch>
          </Router>
        </Suspense>
        </div>
      );
    }
    return (
      <Router>
        <Switch>
          <Landing exact path="/landing"/>
          <LoginPage exact path="/login"/>
          <RegisterPage exact path="/join"/>


          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;

