import React from'react';
import jwt_decode from 'jwt-decode';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

class Settings extends React.Component {
    constructor(){
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }

    //If user is logged he will have a token
    //the token is then decoded and the decoded details
    //are assigned to user
    //if user somehow manages to get into the site without a token
    //send them to the login screen
    componentDidMount(){
        const token = localStorage.usertoken;
        if(!token){
            window.location = '/login';
            console.log('Invalid login');
        }else{
            const decoded = jwt_decode(token);
            this.setState({
                firstname: decoded.firstname,
                lastname: decoded.lastname,
                email: decoded.email,
                password: decoded.password
            });
        }
    }

    //display details of the decoded token
    render(){
        return(
            <div className="settings-comp">
                <Container style={{margin: '0rem 0rem 0rem 20rem'}}>
                    <Card style={{width: '19.5rem', alignItems:'center', margin:'20px 0px 30px 0px'}}
                                        border="success" bg="dark">
                        <h3>Profile:</h3>
                    </Card>
                    <Card style={{width: '20rem', alignItems:'center', margin:'30px 0px 0px 0px'}}
                                        border="success" bg="dark">
                        <Table striped bordered hover variant="dark" style={{width: '15rem', alignItems:'center'}}>
                            <tbody>
                                <tr>
                                    <td>Username:</td>
                                    <td>{this.state.firstname}</td>
                                    <td><Button style={{background:'#4717F6'}}>Edit</Button></td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{this.state.email}</td>
                                    <td><Button style={{background:'#4717F6'}}>Edit
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                    <td>{this.state.password}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default Settings;