import React, { Fragment } from 'react';
import '../../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../../Lists/Recommended'
import { Image, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import Skeleton from 'react-loading-skeleton';
import Clap from '../../../images/clap.png'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { RiChat1Line } from 'react-icons/ri'

export default class Landing extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      isLoading: true,
      isLoadingUsers: true,
      comments: [],
      time: '',
      toggle: false,
      posts: [],
      user: '',
      societies: [],

    };
  }

  async componentDidMount() {
    document.body.style.backgroundColor = "#F7F7F7";

    this.getUserDetails();
    this.getDiscussions();
  }

  // Fetching the users Details
  async getUserDetails() {
    var user = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:4000/users/get-user-details', {
      params: {
        id: user._id
      }
    })

      .then((response) => {
        this.setState({
          user: response.data.user,
          forums: response.data.user.forums,
          socs: response.data.user.societies,
          likedPosts: response.data.user.likedPosts
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Fetching the discussions
  async getDiscussions() {
    var user = JSON.parse(localStorage.getItem('user'));
    await axios.get('http://localhost:4000/discussions/get-discussions', {
      params: {
        fields: 'user society time thumbnail_pic title content likes comments',
        sort: 'likes',
        limit: 5
      }
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          discussions: response.data.discussions,
          isLoading: false,
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var { discussions } = this.state;
    var user = JSON.parse(localStorage.getItem('user'));

    const discussionList = discussions.map(discussion => {
      return (
        <Fragment key={discussion._id}>
          <Card className='discussion-post'>
            <a href={"/d/?id=" + discussion._id} className="miniprofile-post-redirect"><CardContent>
              <span className="voting-btn">
                <span class="showhim"><a href={"/me"} className="post-link-a"><Image src={user.pic} className="profile-btn-wrapper-left" roundedCircle/> <b> {discussion.user}</b></a>
                  <span class="showme"> <b>{discussion.user}</b></span></span>
                {discussion.society == null ? (
                  <span> in <b style={{ color: 'green' }}>General</b></span>
                ) : (
                    <span> in <b style={{ color: 'green' }}>{discussion.society}</b></span>
                  )}<br />
                <span style={{ color: 'gray', fontSize: 10 }}>({moment(discussion.time).startOf('seconds').fromNow()})</span>

                {discussion.thumbnail_pic == null && <div></div>} 
                {discussion.thumbnail_pic && <Image className="post-image" src={discussion.thumbnail_pic} width={200} height={125}/>} 
              </span><br />
              <span className="title-post">{discussion.title}</span><br />
              <span className="content-post">{discussion.content.slice(0, 200)}</span>
            </CardContent></a>
            <CardActions>
              <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary">
                {discussion.likes === 0 && <></>}
                {discussion.likes === 1 && <span> <Image src={Clap} size={20} /> {discussion.likes} reaction</span>}
                {discussion.likes > 1 && <span> <Image src={Clap} size={20} /> {discussion.likes} reactions</span>}
              </button></a>


              <a  href={"/d/?id=" + discussion._id }><button className="reaction-button" size="small" color="primary">
                <RiChat1Line size={20}/> 
                {discussion.comments.length === 0 && <span> Add comment</span>}
                {discussion.comments.length === 1 && <span> {discussion.comments.length} comment</span>}
                {discussion.comments.length > 1 && <span> {discussion.comments.length} comments</span>}

              </button></a>

            </CardActions>

          </Card>

        </Fragment>
      )
    })

    return (
      <Container>
        <Row>
          <Col sm></Col>
          <Col sm>
            <div className="filter-options">
              <a href="/top"><button className="feed-option-active">Top</button></a>
              <a href="/trending"><button className="feed-option-active">Trending</button></a>
              <a href="/new"><button className="feed-option-active">New</button></a>
            </div>


            {this.state.isLoading && <div><br /><Skeleton height={250} width={700} style={{ marginBottom: 10 }} count={5} /></div>}
            {!this.state.isLoading && <div>{discussionList}</div>}            

          </Col>

          <Col sm>
            <Recommended/>
          </Col>
          <Col sm>
            
          </Col>

        </Row>
      </Container>
    );
  }
}