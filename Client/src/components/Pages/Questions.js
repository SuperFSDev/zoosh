import React from 'react';
import '../../assets/App.css';
import 'react-calendar/dist/Calendar.css';
import Recommended from '../Lists/Recommended'
import Contributors from '../Lists/Contributors'
import {Tooltip,OverlayTrigger, Image, Modal} from 'react-bootstrap'
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import {Helmet} from 'react-helmet'
import {BsBookmark,BsBookmarkFill,BsQuestionCircle} from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton';
import {BsBrightnessLow,BsChat} from 'react-icons/bs'
import Clapping from '../../images/clap-hands.png'
import Clap from '../../images/clap.png'
import UsersCommunities from '../Lists/UsersCommunities';
import {BiPlanet} from 'react-icons/bi'
import SearchbarFilter from '../Common/SearchbarFilter'
import AskQuestion from '../Common/AskQuestion';

export default class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoading: true,
      comments:[],
      time:'',
      toggle: false,
      isSaved: false,
      socs:[],
      posts:[],
      user:'',
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
                          socs:response.data.user.societies,
          })
        })
        .catch((error) => {
          console.log(error);
        });

        axios.get('http://localhost:4000/questions/getQuestions')
        .then((response) => {
          this.setState({ 
            questions: response.data.questions,
            users:response.data.questions,
            isLoading: false, })
        })
        .catch((error) => {
          console.log(error);
        });
  }
  removeSaved = () =>{
    this.setState({ 
      isSaved: false,
    })
  }

 addToReadingList(discussion,user_id) {
  
    const addDiscussion = {
        user_id:user_id,
        discussion: discussion._id,
    }
  alert(JSON.stringify(discussion));
  alert(user_id)
    // Adds society to societies array in user model.
    axios.post('http://localhost:4000/users/addToReadingList', addDiscussion)
        .then(function (resp) {
            console.log(resp);
        })
        .catch(function (error) {
            console.log(error);
        })
  }


render(){
  var { questions } = this.state;
  var user = JSON.parse(localStorage.getItem('user'));

  const string =  "In an age when nature and magic rule the world, there is an extraordinary legend: the story of a warrior who communicates with animals, who fights sorcery and the unnatural.";
  string.slice(0, 2)

  const questionList = questions.reverse().slice(0,3).map(question => {
    return(

        <div key={question._id}>
          <div className='discussion-post'>
            <a href={"/q/?id=" + question._id} className="miniprofile-post-redirect">
            <div>
              <p>
                <a href={"u/?id=" + user._id} className="post-link-a"><span className="voting-btn">
                  <b>{question.user}</b>  

                  {question.society == null ? (
                      <span> posted in <b style={{color:'green'}}>General</b></span>
                  ) : (
                    <span> posted in <b style={{color:'green'}}>{question.society}</b></span>
                  )}
                </span></a><br/>
                <span className="forum-title">{question.question}</span>
                
                <br/>
                <button>Answer Question</button>
              </p>
            </div>
            </a>
          </div>
        </div>
      )})

  return (
    <div class="row">
    <div className="column" style={{background:'white'}}>
        <div style={{marginTop:100, marginLeft:330 }}>
            <div className="options-container">
                <a href="/home"><button className="community-btn">All</button></a>
                <a href="/following"><button className="community-btn">Following</button></a>
                <a href="/questions"><button className="community-btn-active">Questions</button></a>
                <a href="/events"><button className="community-btn">Events</button></a>
                <a href="/listings"><button className="community-btn">Listings</button></a>

            </div>
            
            <h5 className="-feed-item-header"><BsQuestionCircle size={20}/> QUESTIONS</h5>
            
            <QuestionModal/>

            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={200} width={800} style={{marginBottom:10}} count={5}/><br/>
    
                </div>

              ) : (
                  <p>{questionList}</p>
              )}
        </div>
    </div>

    <div className="column2" style={{background:'white'}}>
        <div  style={{marginTop:100, width:430, marginLeft:10}}>
            <div>

            <SearchbarFilter/>

            {this.state.isLoading ? ( 
                <div>
                  <div className="spacing"></div>
                  <Skeleton height={300} style={{marginBottom:10}} count={1}/><br/>
                </div>

              ) : (
                <Recommended/>
              )}

            {this.state.isLoading ? ( 
                <div>
                  <Skeleton height={300} style={{marginTop:50}} count={1}/><br/>
                </div>

              ) : (
                <Contributors/> 
              )}
            </div>
        </div>
        
    </div>

</div>
  );
}
}

//  FUNCTIONS TO OPEN EVENT MODAL
function QuestionModal() {
    const [modalShowQuestion, setShowQuestion] = React.useState(false);
  
    return (
      <div>
              <button className="post-option-btn-item-event"  onClick={() => setShowQuestion(true)}>Ask a Question</button>
  
              <Question
                  show={modalShowQuestion}
                  onHide={() => setShowQuestion(false)}
              />
      </div>
    );
  }

function Question(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
        <Modal.Body>
            <AskQuestion/>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }