import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Image, Badge} from 'react-bootstrap'

export default class ReadingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          societies:[],
          isLoading: true,
          users:[],
          searchValue: '',
          filterBy: '',
          readingList: [],
          user: '',
        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#FDFEFE";
      var user = JSON.parse(localStorage.getItem('user'));

      axios.get('http://localhost:4000/users/getUsers')
      .then((response)=>{
          this.setState({
            users: response.data.users,
            isLoading: false})
      })
      .catch((error)=>{
          console.log(error);
      });

      axios.get('http://localhost:4000/users/get-user-details', {
          params: {
              id: user._id,
             
          }
      })
          .then((response) => {
              this.setState({ user: response.data.user,
                readingList: response.data.user.readingList,
              })
          })
          .catch((error) => {
              console.log(error);
          });
    
    
    }
 
    updateSearch(event){
      this.setState({searchValue: event.target.value.substr(0,20)});
    }

render(){

    var{users} = this.state;
 
  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                      <meta charSet="utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                      <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>Search - Users</title>

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
              <h3>Reading List ({this.state.readingList.length})</h3>
              <div className="spacing"></div>

              <div className="reading-list">
                  <a href=""><h4>Title of Post</h4></a>
                  <p>Written by Aaron Moran - <Badge variant="primary">Computer Science GMIT</Badge></p>
                  <button >Remove</button>
                  <hr/>
              </div>
              <div className="reading-list">
                  <a href=""><h4>Title of Post</h4></a>
                  <p>Written by Aaron Moran - <Badge variant="primary">Computer Science GMIT</Badge></p>                  
                  <button>Remove</button>
                  <hr/>
              </div>
              <div className="reading-list">
                  <a href=""><h4>Title of Post</h4></a>
                  <p>Written by Aaron Moran - <Badge variant="primary">Computer Science GMIT</Badge></p>                  
                  <button>Remove</button>
                  <hr/>
              </div>
        </div>


        </div>         
  </div>
    );
   }
  }