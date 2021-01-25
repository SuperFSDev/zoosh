import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
// import AddUserToForum from '../Profile/AddUserToForum'
import { Helmet } from 'react-helmet'
import Avatar from '@material-ui/core/Avatar';
import {BsMic,BsPeople,BsColumnsGap,BsCalendar,BsChatSquareDotsFill,BsBarChart,BsCardText,BsTag,BsXDiamond,BsHouse} from 'react-icons/bs'
import Clap from '../../images/clap.png'
import {Image} from 'react-bootstrap'

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      users:[],
      searchValue: '',
      filterBy: '',
      user: '',
      isLoading: true,
      user: '',
      socs:[],
    };
  }

    componentDidMount() {
      // document.body.style.backgroundColor = "#FDFEFE";
      var user_id = new URLSearchParams(this.props.location.search).get("id");
  
  
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
                          socs:response.data.user.societies

  
          })
        })
        .catch((error) => {
          console.log(error);
        });
  


        axios.get('http://localhost:4000/forums/getForums')
          .then((response) => {
            this.setState({ 
              forums: response.data.forums,
              isLoading:false,

             })
          })
          .catch((error) => {
            console.log(error);
          });

        axios.get('http://localhost:4000/forums/get-forum-page', {
         
          })
            .then((response) => {
              this.setState({ forum: response.data.forum,
                users: response.data.forum.users, 
              })
            })
            .catch((error) => {
              console.log(error);
            });
      }

      updateSearch(event) {
        this.setState({ searchValue: event.target.value.substr(0, 20) });
      }

      addForum(frm) {
        addUserToForum(frm);
      }

render(){

  var user = JSON.parse(localStorage.getItem('user'));
  if(user) 
  {
      var fullname = user.fullname;
  }

  let filteredForumsByName = this.state.forums.filter(

    (forum) => {
      let filter = this.state.filterBy;
      if (filter === "Name") {
        return forum.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;

      }  else {

        return forum.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }
    }

  );

  const forums = filteredForumsByName.reverse().map(forum => {
    return(
    <div key={forum._id}>
        <div>
        <a href={"/f/?id=" + forum._id} className="-soc-l-navigation">
          <div className="forum-card">
              <h5>{forum.name}</h5> 
          </div>
          </a>
        </div>
    </div>
    )})

  return (
     <div>
        {/* REACTJS HELMET */}
        <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Forums - Website</title>

                {/* LINKS */}
                <link rel="canonical" href="http://mysite.com/example" />
                <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
        </Helmet> 

      <div className="containerMiddleForum">
        <div className="global-forum">
        <div className="spacing"></div>
        <h3>All Forums</h3>
        <div className="search-div-forum">
          <input className="searchbar-nav-forum" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a forum " title="Type in a category"/>
        </div>
      </div>

        <div className="global-forum">
          <div className="featured-forums">
              <h5>Give Feedback</h5>
              <div className="forum-option">
                <li>Feature Requests</li><br/>
                
              </div>
          </div>

        <h5>Featured Forums</h5>
          <div className="ForumLayout">
            {forums}
          </div>
        </div>
      </div>
  </div>
  );
  }
 }

// Adding a User to forum to follow
async function addUserToForum(frm) {

  var getUser = JSON.parse(localStorage.getItem('user'))

  const addForum = {
      forum: frm,
      user: getUser,
      user_id: getUser._id,
  }

   // Adds users to forums followers array in user model.
   await axios.post('http://localhost:4000/forums/update', addForum)
      .then(function (resp) {
          console.log(resp);
          alert("Successfully followed forum " + frm);
      })
      .catch(function (error) {
          console.log(error);
      })

  // Adds forum to following array in user model.
  await axios.post('http://localhost:4000/users/addToForumFollowingList',addForum)
      //add to following array
      .then(function (resp) {
          console.log(resp);
      })
      .catch(function (error) {
          console.log(error);
      })

}

