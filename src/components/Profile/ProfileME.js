import { render } from '@testing-library/react';
import React from 'react';
import { RiFacebookCircleFill } from 'react-icons/ri'
import { SiTwitter, SiInstagram, SiLinkedin } from 'react-icons/si'
import axios from 'axios';

export default class ProfileME extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            user: ''
        };
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        this.setState({ id: user._id });

        axios.get('http://localhost:4000/users/get-user-details', {
            params: {
                id: user._id
            }
        })
            .then((response) => {
                this.setState({ user: response.data.user })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {

        return (
            <div>
                <div className="containerFeedLeftProfileCell">
                    <div className="user-profile-about">
                        <h1>About</h1>
                    </div>
                    <div className="user-profile-about">
                        <p>Full Name: <b className="user-details">{this.state.user.fullname}</b></p>
                        <p>College/University: <b className="user-details">GMIT</b></p>
                        <p>Studying: <b className="user-details">Software Development</b></p>
                        <p>Date of Birth: <b className="user-details">24/10/1998</b></p>
                        <p>Profile Views: <b className="user-details-views">1,900,200</b></p>
                    </div>
                    <div className="user-profile-about-social">
                        <p className="profile-social-icons"><RiFacebookCircleFill size={25} /> <SiTwitter size={25} /> <SiInstagram size={25} /> <SiLinkedin size={25} /></p>
                    </div>
                </div>

                <div className="containerFeedMiddleProfileCell">
                    <div className="user-profile-about-bio">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>

                </div>

                <div className="containerFeedRightProfileCell">

                </div>
            </div>
        );

    }
}