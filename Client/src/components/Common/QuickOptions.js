import React from 'react';
import '../../App.css';
import {VscTextSize} from 'react-icons/vsc'
import {MdForum} from 'react-icons/md'
import {Modal, Image,OverlayTrigger, Tooltip,} from 'react-bootstrap'
import Post from './CreatePost'
import Discussion from '../Common/StartDiscussion'
import Link from '../Common/CreateLinkPost'
import {BiLink} from 'react-icons/bi'
import {FcPicture,FcLink} from 'react-icons/fc'

export default function QuickOptions() {
  const [modalShow, setModalShowText] = React.useState(false);
  const [modalShowForum, setModalShowForum] = React.useState(false);
  const [modalShowImage, setModalShowImage] = React.useState(false);
  const [modalShowLink, setModalShowLink] = React.useState(false);


  return (
    <div>
      <div className="quick-options-container">
        <div className="quick-options">
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Create a Post</Tooltip>}>
              <button className="quick-post-options"  onClick={() => setModalShowText(true)}><VscTextSize size={40}/></button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Start a Discussion</Tooltip>}>
              <button className="quick-post-options-forum" onClick={() => setModalShowForum(true)}><MdForum size={40}/></button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Post an Image</Tooltip>}>
              <button className="quick-post-options-image" onClick={() => setModalShowImage(true)}><FcPicture size={40}/></button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Post a Link</Tooltip>}>
              <button className="quick-post-options-link" onClick={() => setModalShowLink(true)}><FcLink size={40}/></button>
            </OverlayTrigger>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShowText(false)}
            />

            <MyVerticallyCenteredModalForum
                show={modalShowForum}
                onHide={() => setModalShowForum(false)}
            />

            <MyVerticallyCenteredModalImage
                show={modalShowImage}
                onHide={() => setModalShowImage(false)}
            />        

            <MyVerticallyCenteredModalLink
                show={modalShowLink}
                onHide={() => setModalShowLink(false)}
            />
        </div>
      </div>
    </div>
    
  );
}

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
          <Modal.Body>
              <Post/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
  }


function MyVerticallyCenteredModalForum(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
        className="modalOption"
      >
        <Modal.Header closeButton>
        <Modal.Body>
                <Discussion/>
        </Modal.Body>
        </Modal.Header>
      </Modal>
    );
    }

function MyVerticallyCenteredModalImage(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          textAlign="left"
        >
          <Modal.Header closeButton>
            <Modal.Body>
                    <Post/>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      );
  }

function MyVerticallyCenteredModalLink(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        textAlign="left"
      >
        <Modal.Header closeButton>
          <Modal.Body>
                  <Link/>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    );
}