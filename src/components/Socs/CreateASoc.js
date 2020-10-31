import React from 'react';
import '../../App.css';
import {Form, Col, Button, Breadcrumb} from 'react-bootstrap'

function Leaderboard() {
  return (
    <>
    <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Create a Society</Breadcrumb.Item>
      </Breadcrumb>
    
    <div className="create-a-soc">
        <Form>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridSocName">
            <Form.Label>Society Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Society Name" />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridCollege">
            <Form.Label>College</Form.Label>
            <Form.Control placeholder="GMIT, NUIG, GTI" />
        </Form.Group>

        <Form.Group controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Enter Address" />
        </Form.Group>

        <Form.Row>
           
        </Form.Row>

        <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Make Private" />
        </Form.Group>

        <Button className="submit-soc" variant="primary" type="submit">
            Create Society
        </Button>
        </Form>
    </div>
    </>
  );
}

export default Leaderboard;
