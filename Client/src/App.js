import loadable from '@loadable/component'
import React, {Suspense} from 'react';
import './assets/App.css';
import './assets/Media.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NewPost from './components/Pages/NewPost';
const NavBar = loadable(() => import('./components/Navbar'));
const RegisterPage = loadable(() => import('./components/auth/Register'));
const LoginPage = loadable(() => import('./components/auth/Login'));
const NotFoundPage = loadable(() => import('./components/404/NotFoundPage'));

const TopPosts = loadable(() => import('./components/Pages/AllPosts'));
const Following = loadable(() => import('./components/Pages/FollowingLayout'));
const Users = loadable(() => import('./components/Pages/Users'));
const Profile = loadable(() => import('./components/Profile/MyProfile'));
const ReadingList = loadable(() => import('./components/Pages/ReadingList'));
const ViewProfile = loadable(() => import('./components/Profile/UserProfile'));
const CommunityPage = loadable(() => import('./components/Pages/UniquePages/CommunityPage'));
const AccountSettings = loadable(() => import('./components/Profile/AccountSettings'));
const Explore = loadable(() => import('./components/Pages/Explore'));
const DiscussionPost = loadable(() => import('./components/Pages/UniquePages/DiscussionPost'));
const Leaderboard = loadable(() => import('./components/Pages/Leaderboard'));
const Notifications = loadable(() => import('./components/Pages/Notifications'));
const Search = loadable(() => import('./components/Pages/Search'));
const AdminSettings = loadable(() => import('./components/Profile/AdminSettings'));


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
              <Following exact path="/home"/>
              <Search exact path="/search"/>
              <Users exact path="/users"/>
              <Profile exact path="/me"/>
              <ReadingList exact path="/saved"/>
              <ViewProfile exact path="/u"/>
              <CommunityPage exact path="/c"/>
              <AccountSettings exact path="/settings"/>
              <Explore exact path="/explore"/>
              <DiscussionPost exact path="/d"/>
              <AdminSettings exact path="/admin"/>
              <NewPost exact path="/new"/>
              <Leaderboard exact path="/leaderboard"/>
              <Notifications exact path="/notifications"/>

              {/* 404 Not Found Exception */}
              <Router>
                <Switch>
                  <Following exact path="/"/>
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
        {/* <PreNavbar/>    */}
        <Switch>
          <LoginPage exact path="/login"/>
          <RegisterPage exact path="/join"/>

          <Route component={DefaultRoutes} />
        </Switch>
      </Router>
    );
  }
}

export default App;

