import React from 'react';
import '../../assets/App.css';
import { Card} from 'react-bootstrap';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'


export default class History extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      posts:[]
    };
  }

    componentDidMount() {
      var user_id = new URLSearchParams(document.location.search).get("id");
      axios.get('http://localhost:4000/users/get-user-details', {
        params: {
          id: user_id
        }
      })
        .then((response) => {
          this.setState({ user: response.data.user,
             posts:response.data.user.posts
          })
          
        })
        .catch((error) => {
          console.log(error);
        });
        
    }

  render(){
    

     return (
      <div>
                {this.state.posts.reverse().map(post=>  (
              <div key={this.state.user._id}>  
               <Card className='userPosts'>
                  <Card.Body>          
                    <Card.Text className="fontPost">
                    <a href={"/p/?id=" + post.Post_id}><b className="user-score-post-tag">1234</b>  {post.post} <big  className="text-muted-profile">{moment(post.time).format(" MMM Do 'YY.")}</big><hr/></a>
                    </Card.Text>        
                  </Card.Body>  
                  <h1></h1>                
                </Card>
              </div>
            ))} 
       </div>
  );
}
}