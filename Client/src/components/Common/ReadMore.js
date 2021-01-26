import React from 'react';
import '../../assets/App.css';
import axios from 'axios';
import { Image} from 'react-bootstrap';
export default class DiscussionPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: '',
      discussions: [],
      discussion_id:'',
      isLoading:true,
    };
  }

    componentDidMount() {
      
      axios.get('http://localhost:4000/discussions/getDiscussions')
      .then((response) => {
        this.setState({ 
          discussions: response.data.discussions,
          users:response.data.discussions,
          isLoading: false, })
      })
      .catch((error) => {
        console.log(error);
      });
    }

    render() {
      var { discussions } = this.state;
      var user = JSON.parse(localStorage.getItem('user'));
      var size = 3;

      const readMore = discussions.slice(0,size).map(discussion => {
        return(
    
            <div key={discussion._id}>
              <div className='discussion-post'>
                <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect">
                <div>
                  <p>
                    <a href={"u/?id=" + user._id} className="post-link-a"><span className="voting-btn">
                      <b>{discussion.user}</b>  
    
                      {discussion.society == null ? (
                          <span> posted in <b style={{color:'green'}}>General</b></span>
                      ) : (
                        <span> posted in <b style={{color:'green'}}>{discussion.society}</b></span>
                      )}
                    </span></a><br/>
                    <span className="forum-title">{discussion.title.slice(0,35)}</span>
                    {discussion.picture == null ? (
                      <div></div>
                    ) : (
                      <Image className="post-image" src={discussion.picture} width={150} height={125}/>
                    )}
                  </p>
                </div></a>
              </div>
            </div>
          )})
      return (
        <>
            <div style={{marginTop:50}}>
                <h3>Read More</h3>
                {readMore}
            </div>
        </>
    );
  }
}


