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
      axios.get('http://localhost:4000/discussions/get-following-discussions', {
        params: {
          id: user_id
        }
      })
        .then((response) => {
          this.setState({
             posts:this.state.posts.concat(response.data.discussion)
          })
          
        })
        .catch((error) => {
          console.log(error);
        });
        
    }

  render(){

    var size = 10;
    
console.log(this.state.posts);
     return (
      <div>
        
          {this.state.posts.slice(0,10).reverse().map(post=>  (
              <div key={this.state.user._id}>  
               <Card className='userPosts'>
                  <Card.Body>          
                    <Card.Text className="fontPost">
                    <a href={"/d/?id=" + post._id}>
                      <p>
                        <span className="forum-title">{post.title}</span><br/>
                        <span className="content-muted">{post.content.slice(0,100)}...</span><br/>
                        {post.society == null ? (
                            <span  className="content-muted">Posted in<b> General</b><br/></span>
                        ) : (
                          <span  className="content-muted"><b>{post.society}</b><br/></span>
                        )}
                        <small className="text-muted">{moment(post.time).format(" MMM Do 'YY.")}</small><hr/>
                      </p>
                    </a>
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