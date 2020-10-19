import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebook extends Component {

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

    componentClicked = () => console.log("component clicked");

    render() {

        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <div style={{
                    width: '500px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding: '20px'
                }}>
                    <img src={this.state.picture} alt={this.state.name}></img>
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
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
        return <div>{fbContent}</div>;
    }
}