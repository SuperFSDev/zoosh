import React from 'react';
import '../../assets/App.css';
import axios from 'axios';
import {Image} from 'react-bootstrap'
import {Helmet} from 'react-helmet'

export default class UserConnections extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            user: '',
            following: [],
            followers: [],
        };
      }
  
    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        document.body.style.backgroundColor = "#f0f2f5";
  
        this.setState({ id: user._id });
  
        axios.get('http://localhost:4000/users/get-user-details', {
            params: {
                id: user._id,
               
            }
        })
            .then((response) => {
                this.setState({ user: response.data.user,
                followers: response.data.user.followers,
                following: response.data.user.following, })
            })
            .catch((error) => {
                console.log(error);
            });
  
        }
  
      render(){
          return (
          <>
                {/* REACTJS HELMET */}
                <Helmet>
                        <meta charSet="utf-8" />
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                        <title>Connections</title>

                        {/* LINKS */}
                        <link rel="canonical" href="http://mysite.com/example" />
                        <link rel="apple-touch-icon" href="http://mysite.com/img/apple-touch-icon-57x57.png" />
                        <link rel="apple-touch-icon" sizes="72x72" href="http://mysite.com/img/apple-touch-icon-72x72.png" />
                </Helmet> 

                <div className="container-square">
                    <div className="search-div-forum">
                        <input className="searchbar-nav-forum" type="text" id="mySearch"  placeholder="Search for a User... " title="Type in a category"/>
                    </div><div className="spacing"></div>

                    <h1>Following <b className="user-score">{this.state.following.length}</b></h1><hr/>
                    <div className="Connections">
                        <Image className="user-image-mini" src={this.state.user.pic} roundedCircle/>
                        <Image className="user-image-mini" src={this.state.user.pic} roundedCircle/>
                        <Image className="user-image-mini" src={this.state.user.pic} roundedCircle/>
                        <Image className="user-image-mini" src={this.state.user.pic} roundedCircle/>
                    </div>


                    <div className="spacing"></div>

                    <h1>Followers <b className="user-score">{this.state.followers.length}</b></h1><hr/>
                    <div className="Connections">
                        <div class="dropdown3">
                            <Image className="user-image-mini" src={this.state.user.pic} roundedCircle/>
                            <div class="dropdown-content3">
                            {/* {this.state.followers.map(follower=>
                                  <li>{follower}</li>)} */}
                                  <a href="/me">{this.state.user.fullname}</a>
                            </div>
                        </div>
                    </div>
                </div> 
            </>
        );
      }
}