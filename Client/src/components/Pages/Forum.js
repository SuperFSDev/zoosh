import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
// import AddUserToForum from '../Profile/AddUserToForum'
import { Helmet } from 'react-helmet'
import SkeletonForum from '../Common/SkeletonUI/SkeletonForum';

export default class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      searchValue: '',
      filterBy: '',
      user: '',
      isLoading: true,
    };
  }

    componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";
      var user_id = new URLSearchParams(this.props.location.search).get("id");
  
  
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
  
        .then((response) => {
          this.setState({ user: response.data.user,
                          forums: response.data.user.forums,
  
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
      }

      updateSearch(event) {
        this.setState({ searchValue: event.target.value.substr(0, 20) });
      }

      addForum(frm) {
        addUserToForum(frm);
      }

render(){

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
  if(this.state.isLoading){
    return (
      <div>
        <SkeletonForum/>
      </div>
    )
  } else{
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
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
        <div className="global-feed">
        <h3>All Forums</h3>
        <div className="search-div-forum">
          <input className="searchbar-nav-forum" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a forum " title="Type in a category"/>
        </div>

        <div className="featured-forums">
            <h3>Following</h3>
            {this.state.forums.map(forum=>
                <li>{this.state.forums.forum}</li>)}<br/>
            <a href="#"><div className="forum-option">
                <h5>{this.state.user.forums}</h5>
            </div></a>
        </div>

        {/* <a href={"/d/?id=" + discussion._id} className="discussion-post-redirect"><div className='discussion-post'> */}


        <div className="featured-forums">
            <h3>Featured</h3>
            {filteredForumsByName.map(forum => (
            <div key={forum.id}>
              <a href={"/f/?id="+forum._id}><br/><div className="forum-option">
                <div className="forum-item-title">
                    <h5 className="forum-btn-wrapper-left">{forum.name}</h5>
                </div>
                <button className="standard-button" onClick={() => this.addForum(forum.name)}>Follow</button>
            </div></a>
                  <div >
              </div>
            </div>

          ))}
        </div>
        </div>
      </div>

      <div className="containerFeedRight">
        
      </div>
  </div>
  );
  }
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

