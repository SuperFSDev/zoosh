import React from 'react';
import '../../App.css';
import { Form, Col, Button, Breadcrumb } from 'react-bootstrap'
import axios from 'axios';

class CreateASoc extends React.Component {

    collegeList = ['NUIG', 'GMIT', 'GTI'];
    categories = ['LGBTQ', 'Fitness', 'Music', 'Outdoors', 'Maths', 'Gaming', 'Debating', 'Religion', 'Volunteering'];

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            college: '',
            category: '',
            address: '',
            private: false
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCollege = this.onChangeCollege.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
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
            private: this.state.private
        };

        if (!newSoc.name || !newSoc.college || !newSoc.category || !newSoc.address) {
            alert('Invalid or Empty input(s)');
            console.log('Invalid Parameters')
        }
        var validCollege = this.collegeList.some(college => college === this.state.college.toUpperCase());
        alert(validCollege);
        if (!validCollege) {
            alert('College must be either NUIG, GMIT or GTI');
        }
        else {

            axios.post('http://localhost:4000/societies/create', newSoc)
                .then()
                .catch(console.log("error"))

            console.log('New society registered!');
            window.location = '/list-of-clubs-and-societies';
        }

        this.setState({
            name: '',
            college: '',
            category: '',
            address: '',
            private: false
        });
    }

    render(){
        return(
            <>
            <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Create a Society</Breadcrumb.Item>
            </Breadcrumb>
            
            <div className="create-a-soc">
                <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSocName">
                        <Form.Label>Society Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Society Name" required value={this.state.name} onChange={this.onChangeName}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridCollege">
                        <Form.Label>College</Form.Label>
                        <Form.Control placeholder="GMIT, NUIG, GTI" required value={this.state.college} onChange={this.onChangeCollege}/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Enter Address" required value={this.state.address} onChange={this.onChangeAddress}/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress">
                        <Form.Label>Category</Form.Label>
                        <Form.Control placeholder="Enter Category" required value={this.state.category} onChange={this.onChangeCategory}/>
                    </Form.Group>

                    <Form.Row>
                    
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Make Private" value={this.state.private} onChange={this.onChangePrivate}/>
                    </Form.Group>

                    <Button className="submit-soc" variant="primary" type="submit">
                            Create Society
                    </Button>
                </Form>
            </div>
            </>
        );
    }
}

export default CreateASoc;
