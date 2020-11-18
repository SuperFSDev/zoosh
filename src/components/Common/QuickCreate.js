import React from 'react';
import {Modal, Tabs, Tab,Image} from 'react-bootstrap'
import {HiPencilAlt} from 'react-icons/hi'
import Post from '../Common/CreateDiscussion'
import Discussion from '../Common/StartDiscussion'
import {VscTextSize,VscLink} from 'react-icons/vsc'
import {MdForum} from 'react-icons/md'
import {BsCardImage} from 'react-icons/bs'
import Create from '../../images/pencil2.png'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quick Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs defaultActiveKey="post" id="controlled-tab-example">
            <Tab eventKey="post" title={<VscTextSize size={30}/>}>
                <Post/>
            </Tab>
            <Tab eventKey="forum" title={<MdForum size={30}/>}>
                <Discussion/>
            </Tab>
            <Tab eventKey="image" title={<BsCardImage size={30}/>}>
                Images
            </Tab>
            <Tab eventKey="video" title={<VscLink size={30}/>}>
                Link
            </Tab>
        </Tabs>
        </Modal.Body>
      </Modal>
    );
  }
  
 export default function QucikCreate() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
       <button className="compose-post-navbar" onClick={() => setModalShow(true)}><Image src={Create}/></button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  