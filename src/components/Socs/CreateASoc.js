import React from 'react';
import '../../App.css';
import { Form, Col} from 'react-bootstrap'
import axios from 'axios';
import {TextField} from '@material-ui/core';
import cogoToast from 'cogo-toast'

var getUser = JSON.parse(localStorage.getItem('user'))


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
            private: false
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCollege = this.onChangeCollege.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrivate = this.onChangePrivate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
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

    onSubmit(e) {

        e.preventDefault();

        const newSoc = {
            name: this.state.name,
            college: this.state.college,
            category: this.state.category,
            address: this.state.address,
            description: this.state.description,
            private: this.state.private,
            admin:getUser._id
        };

        if (!newSoc.name || !newSoc.college || !newSoc.category || !newSoc.address) {
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
            cogoToast.success("Community was created!");
            window.location = '/list-of-clubs-and-societies';
        }

        this.setState({
            name: '',
            college: '',
            category: '',
            address: '',
            description: '',
            private: false
        });
    }

    render(){
        return(
            <>
            
            <div className="create-a-soc">
                <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSocName">
                        <TextField type="text" placeholder="Enter Society Name" required value={this.state.name} onChange={this.onChangeName} className="textfield-create-a-soc" id="outlined-basic" label="Society Name" variant="outlined" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridCollege">
                        <TextField placeholder="GMIT, NUIG, GTI" required value={this.state.college} onChange={this.onChangeCollege} className="textfield-create-a-soc" id="outlined-basic" label="University/College" variant="outlined" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress">
                        <TextField placeholder="Enter Address" required value={this.state.address} onChange={this.onChangeAddress} className="textfield-create-a-soc" id="outlined-basic" label="Address" variant="outlined" />
                    </Form.Group>

                    <Form.Group controlId="formGridDescription">
                        <input type="text" className="textfield-create-a-soc"   required value={this.state.description} onChange={this.onChangeDescription} name="desc" placeholder="Description" maxLength={60}/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress">
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
                    </Form.Group>


                    {/* <FormControl variant="outlined">
                            <InputLabel required value={this.state.category} onChange={this.onChangeCategory} className="textfield-create-a-soc" id="outlined-basic" label="Category" variant="outlined" >Category</InputLabel>
                            <Select native label="Category"
                                inputProps={{
                                    name: 'category',
                                    id: 'outlined-age-native-simple',
                                }}>
                            <option aria-label="None" value=""/>
                            <option value={10}>Sport</option>
                            <option value={20}>Music</option>
                            <option value={30}>Politics</option>
                            </Select>
                        </FormControl> */}

                    <Form.Row>
                    
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        {/* <FormControlLabel type="checkbox" label="Make Private" value={this.state.private} onChange={this.onChangePrivate} control={<Switch />} label="Make Private"/> */}
                        <Form.Check type="checkbox" label="Make Private" value={this.state.private} onChange={this.onChangePrivate}/>
                    </Form.Group>
                    <div className="create-soc-div">
                        <button className="submit-soc" variant="primary" type="submit">Create Society</button>
                    </div>
                </Form>
            </div>
            </>
        );
    }
}
