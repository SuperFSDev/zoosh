import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import AddUserToForum from '../Profile/AddUserToForum'

class Forum extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      forums: [],
      searchValue: '',
      filterBy: '',
      user: '',
      forums: [],
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
            this.setState({ forums: response.data.forums })
          })
          .catch((error) => {
            console.log(error);
          });
      }

      updateSearch(event) {
        this.setState({ searchValue: event.target.value.substr(0, 20) });
      }

      addForum(forum) {
        AddUserToForum(forum);
      }

render(){

  let filteredForumsByName = this.state.forums.filter(

    (forum) => {
      let filter = this.state.filterBy;
      if (filter == "Name") {
        return forum.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;

      }  else {

        return forum.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
      }
    }

  );

  return (
     <div>
      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerForumMiddle">
        <h1>All Forums</h1>
        <div className="search-div-forum">
          <input className="searchbar-nav-forum" type="text" id="mySearch" onChange={this.updateSearch.bind(this)} placeholder="Search for a forum " title="Type in a category"/>
        </div>

        <div className="featured-forums">
            <h3>Following</h3>
            <a href="#"><div className="forum-option">
                <h5>{this.state.user.forums}</h5>
            </div></a>
        </div>

        {/* <a href={"/d/?id=" + discussion._id} className="discussion-post-redirect"><div className='discussion-post'> */}


        <div className="featured-forums">
            <h3>Featured</h3>
            {filteredForumsByName.map(forum => (
            <div key={forum.id}>
              <a href={"/f/?id="+forum._id}><div className="forum-option">
                <div className="forum-item-title">
                    <h5 className="forum-btn-wrapper-left">{forum.name}</h5>
                </div>
                <button className="forum-follow-btn" onClick={() => this.addForum(forum.name)}>Follow</button>
            </div></a>
                  <div >
              </div>
            </div>

          ))}
        </div>
        
      </div>

      <div className="containerFeedRight">
        
      </div>
  </div>
  );
}
}
export default Forum;