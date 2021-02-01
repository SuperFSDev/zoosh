import React from 'react';
import '../../assets/App.css';
import { Form, Col} from 'react-bootstrap'
import axios from 'axios';
import {TextField} from '@material-ui/core';
import cogoToast from 'cogo-toast'
import ImageUploader from 'react-images-upload';

var getUser = JSON.parse(localStorage.getItem('user'))
const Compress = require('compress.js')


export default class CreateASoc extends React.Component {

    collegeList = ['NUIG', 'GMIT', 'GTI'];
    categories = ['LGBTQ', 'Fitness', 'Music', 'Outdoors', 'Maths', 'Gaming', 'Debating', 'Religion', 'Volunteering'];

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            college: '',
            category: '',
            address: '',
            description: '',
            facebook: '',
            twitter: '',
            color:'',
            instagram: '',
            other: '',
            private: false,
            public:true,
            time: new Date().getTime(),
            picture: ''
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCollege = this.onChangeCollege.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrivate = this.onChangePrivate.bind(this);
        this.onChangePublic = this.onChangePublic.bind(this);
        this.onChangeFacebook = this.onChangeFacebook.bind(this);
        this.onChangeTwitter = this.onChangeTwitter.bind(this);
        this.onChangeInstagram = this.onChangeInstagram.bind(this);
        this.onChangeOther = this.onChangeOther.bind(this);
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
    onChangeCollege(e) {
        this.setState({
            college: e.target.value
        });
    }
    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
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

    onChangeFacebook(e) {
        this.setState({
            facebook: e.target.value
        });
    }

    onChangeTwitter(e) {
        this.setState({
            twitter: e.target.value
        });
    }

    onChangeInstagram(e) {
        this.setState({
            instagram: e.target.value
        });
    }

    onChangeOther(e) {
        this.setState({
            other: e.target.value
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
          quality: 0.9, // the quality of the image, max is 1,
          maxWidth: 250, // the max width of the output image, defaults to 1920px
          maxHeight: 250, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        }).then((data) => {
          if(data[0])
          {
            var data = data[0];
            var b64 = data.prefix + data.data;
      
            this.setState({
              //picture: this.state.picture.concat(b64)
              picture: b64
            });
            console.log(this.state.picture);
          }
        })
      }

    onSubmit(e) {

        e.preventDefault();

        const newSoc = {
            name: this.state.name,
            college: this.state.college,
            category: this.state.category,
            address: this.state.address,
            description: this.state.description,
            facebook: this.state.facebook,
            twitter: this.state.twitter,
            instagram: this.state.instagram,
            other: this.state.other,
            private: this.state.private,
            public: this.state.public,
            admin:getUser._id,
            time: new Date().getTime(),
            picture: this.state.picture,
            color: this.state.color

        };

        if (!newSoc.name || !newSoc.college || !newSoc.address) {
            alert('Invalid or Empty input(s)');
        }
        var validCollege = this.collegeList.some(college => college === this.state.college.toUpperCase());
        if (!validCollege) {
            alert('College must be either NUIG, GMIT or GTI');
        }
        else {
            axios.post('http://localhost:4000/societies/create', newSoc)
                .then(function(resp) {
                    console.log(resp);
                })
                .catch(function(error){
                    console.log(error);
                })
            cogoToast.success(
                <div>
                  <h4>Success!</h4>
                  <div>Your new Community was created.</div>
                </div>
              );
            window.location = '/communities';
        }

        this.setState({
            name: '',
            college: '',
            category: '',
            address: '',
            description: '',
            facebook: '',
            color: '',

            twitter: '',
            instagram: '',
            other: '',
            private: false,
            public: true,
            time: new Date().getTime(),
            picture: '',
        });
    }

    render(){
        return(
            <>
            <div className="create-a-soc">
                <Form onSubmit={this.onSubmit}>
                    <Form.Label>
                        <b>Community Details</b>
                    </Form.Label>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSocName">
                        <TextField type="text" placeholder="Community Name" required value={this.state.name} onChange={this.onChangeName} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridCollege">
                        <TextField placeholder="University/College - GMIT, NUIG, GTI" required value={this.state.college} onChange={this.onChangeCollege} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                    </Form.Group> 

                    <Form.Group controlId="formGridAddress">
                        <TextField placeholder="Address" required value={this.state.address} onChange={this.onChangeAddress} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                    </Form.Group> 

                    <Form.Group controlId="formGridDescription">
                        <TextField type="text" className="textfield-create-a-soc"   required value={this.state.description} onChange={this.onChangeDescription} id="outlined-basic" variant="outlined" name="desc" placeholder="Community Description" maxLength={60}/>
                    </Form.Group>

                    <div className="spacing"></div>
                    <hr/>
                    <div className="spacing"></div>

                    <Form.Label>
                        <b>Display</b>
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

                    <Form.Label>
                        <b>Color code</b>
                    </Form.Label>
                    <Form.Group controlId="formGridDescription">
                        <TextField placeholder="#000000"  value={this.state.color} onChange={this.onChangeColor} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                    </Form.Group>
                    {/* <div className="spacing"></div>
                    <hr/>
                    <div className="spacing"></div>
                    <Form.Label>
                        <b>Social Media URL's</b>
                    </Form.Label> */}
                    {/* Social Media Links */}
                    {/* <Form.Group controlId="formGridDescription">
                        <TextField placeholder="Color URL"  value={this.state.color} onChange={this.onChangeColor} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                    </Form.Group> */}
                    {/* <Form.Group controlId="formGridDescription">
                        <TextField placeholder="Facebook URL"  value={this.state.facebook} onChange={this.onChangeFacebook} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                    </Form.Group>
                    <Form.Group controlId="formGridDescription">
                        <TextField placeholder="Twitter URL"  value={this.state.twitter} onChange={this.onChangeTwitter} className="textfield-create-a-soc" id="outlined-basic"  variant="outlined" />
                    </Form.Group>
                    <Form.Group controlId="formGridDescription">
                        <TextField placeholder="Instagram URL"  value={this.state.instagram} onChange={this.onChangeInstagram} className="textfield-create-a-soc" id="outlined-basic" variant="outlined" />
                    </Form.Group>
                    <Form.Group controlId="formGridDescription">
                        <TextField placeholder="Other URLS"  value={this.state.other} onChange={this.onChangeOther} className="textfield-create-a-soc" id="outlined-basic"  variant="outlined" />
                    </Form.Group> */}

                    {/* <Form.Group controlId="formGridAddress">
                        <select className="-c-list-options" name="category" id="category" placeholder="Choose a Category" value={this.state.category} onChange={this.onChangeCategory}>
                            <option disabled selected="Choose a Category" value="choose">Choose a Category</option>
                            <option value="Sports">Sports</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art & Design</option>
                            <option value="LGBTQ">LGBTQ</option>
                            <option value="Religion">Religion</option>
                            <option value="Politics">Politics</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
                        </select>
                    </Form.Group> */}
                    <div className="spacing"></div>
                    <hr/>
                    <div className="create-soc-div">
                        <button className="standard-button" variant="primary" type="submit">Create Community</button>
                    </div>
                </Form>
            </div>
            </>
        );
    }
}
