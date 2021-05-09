import React from 'react';
import '../../assets/App.css';
import { Form, Col } from 'react-bootstrap'
import axios from 'axios';
import { TextField } from '@material-ui/core';
import cogoToast from 'cogo-toast'
import ImageUploader from 'react-images-upload';

var getUser = JSON.parse(localStorage.getItem('user'))
const Compress = require('compress.js')


export default class CreateASoc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            color: '',
            private: false,
            public: true,
            time: new Date().getTime(),
            picture: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrivate = this.onChangePrivate.bind(this);
        this.onChangePublic = this.onChangePublic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onDropPicture = this.onDropPicture.bind(this);
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeColor(e) {
        this.setState({
            color: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangePrivate(e) {
        this.setState({
            private: e.target.value
        });
    }

    onChangePublic(e) {
        this.setState({
            public: e.target.value
        });
    }

    onChangeTime(e) {
        this.setState({
            time: new Date().getTime(),
        });
    }

    async onDropPicture(pictureFiles, pictureDataURLs) {

        const compress = new Compress();

        compress.compress(pictureFiles, {
            size: 4, // the max size in MB, defaults to 2MB
            quality: 1, // the quality of the image, max is 1,
            maxWidth: 500, // the max width of the output image, defaults to 1920px
            maxHeight: 250, // the max height of the output image, defaults to 1920px
            resize: true, // defaults to true, set false if you do not want to resize the image width and height
        }).then((data) => {
            if (data[0]) {
                data = data[0];
                var b64 = data.prefix + data.data;

                this.setState({
                    //picture: this.state.picture.concat(b64)
                    picture: b64
                });
                console.log(this.state.picture);
            }
        })
    }

    // Adding a User to a society array and adding the society to the users array
    async addUserToSoc(soc) {

        var getUser = JSON.parse(localStorage.getItem('user'))

        console.log(soc);
        console.log(getUser._id);

        const addUser = {
            society: soc,
            user: getUser._id,
        }

        // Adds society to societies array in user model.
        await axios.post('http://localhost:4000/users/addToSocList', addUser)
            .then(function (resp) {
                console.log(resp);

                // Update societies array in localStorage
                if (!getUser.societies.includes(soc)) {
                    getUser.societies.push(soc);
                }
                console.log(getUser);
                localStorage.setItem('user', JSON.stringify(getUser))
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async onSubmit(e) {

        e.preventDefault();
        var response = null;

        const newSoc = {
            name: this.state.name,
            description: this.state.description,
            private: this.state.private,
            public: this.state.public,
            admin: getUser._id,
            time: new Date().getTime(),
            picture: this.state.picture,
            color: this.state.color
        };

        await axios.post('http://localhost:4000/societies/create', newSoc)
            .then(function (resp) {

            })
            .catch(function (error) {
                console.log(error);
            })
        

        this.setState({
            name: '',
            description: '',
            color: '',

            private: false,
            public: true,
            time: new Date().getTime(),
            picture: '',
        });
        cogoToast.success(
            <div>
                <h4>Success!</h4>
                <div>Your new Community was created.</div>
            </div>
        );

        window.location = '/explore';
    }

    render() {
        return (
            <>
                <div className="create-a-soc">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Label>
                            <b>Name</b>
                        </Form.Label>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridSocName">
                                <input minlength="4" maxlength="20" type="text" placeholder="Community Name" required value={this.state.name} onChange={this.onChangeName} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Label>
                            <b>Description</b>
                        </Form.Label>
                        <Form.Group controlId="formGridDescription">
                            <input minlength="8" maxlength="200" type="text" className="textfield-create-a-soc" required value={this.state.description} onChange={this.onChangeDescription} id="outlined-basic" variant="outlined" name="desc" placeholder="Community Description" />
                        </Form.Group>
                        <Form.Label>
                            <b>Display Picture</b>
                        </Form.Label>
                        <Form.Group controlId="formGridDescription">
                            <ImageUploader
                                withIcon={true}
                                withPreview={true}
                                buttonText='Choose images'
                                onChange={this.onDropPicture}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                required
                            />
                        </Form.Group>

                        <div className="create-soc-div">
                            <button className="standard-button" variant="primary" type="submit">Create Community</button>
                        </div>
                    </Form>
                </div>
            </>
        );
    }
}