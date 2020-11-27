import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Facebook extends Component {

    showContent = false;
    fbContent = "";

    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        });
    };

    componentClicked = () => console.log("clicked");

    render() {

        if (this.state.isLoggedIn) {
            this.fbContent = (
                <div style={{
                    width: '400px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding: '20px'
                }}>
                    <img src={this.state.picture} alt={this.state.name}></img>
                </div>
            );
        } else {
            this.fbContent = (<FacebookLogin
                className="fb-login"
                    appId="1177500526020242"
                    autoLoad={true}
                    fields="name,picture"
                    scope="public_profile,user_friends"
                    callback={this.responseFacebook}
                    icon="fa-facebook"
            />
            );
        }
        return <div>{this.fbContent}</div>;
    }
}