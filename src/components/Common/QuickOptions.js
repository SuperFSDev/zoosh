import React from 'react';
import '../../App.css';
import {VscTextSize} from 'react-icons/vsc'
import {MdForum} from 'react-icons/md'
import {Modal, Image} from 'react-bootstrap'
import Post from './CreatePost'
import Discussion from '../Common/StartDiscussion'
import Link from '../Common/CreateLinkPost'
import {BsImage} from 'react-icons/bs'
import {BiLink} from 'react-icons/bi'
import {FaForumbee} from 'react-icons/fa'
import {CgCommunity} from 'react-icons/cg'
import {FcBullish,FcCalendar,FcHome} from 'react-icons/fc'
import {AiFillHome} from 'react-icons/ai'
import Team from '../../images/group.png';
import Forum from '../../images/forum.png';

export default function QuickOptions() {
  const [modalShow, setModalShowText] = React.useState(false);
  const [modalShowForum, setModalShowForum] = React.useState(false);
  const [modalShowLink, setModalShowLink] = React.useState(false);


  return (
    <div>
      <div className="quick-options-container">
        <div className="quick-options">
            <button className="quick-post-options"  onClick={() => setModalShowText(true)}><VscTextSize size={40}/></button>
            <button className="quick-post-options-forum" onClick={() => setModalShowForum(true)}><MdForum size={40}/></button>
            <button className="quick-post-options-image"><BsImage size={40}/></button>
            <button className="quick-post-options-link" onClick={() => setModalShowLink(true)}><BiLink size={40}/></button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShowText(false)}
            />

            <MyVerticallyCenteredModalForum
                show={modalShowForum}
                onHide={() => setModalShowForum(false)}
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
          <Modal.Title id="contained-modal-title-vcenter">
            Quick Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Post/>
        </Modal.Body>
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
          <Modal.Title id="contained-modal-title-vcenter">
            Start a Discussion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Discussion/>
        </Modal.Body>
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
          <Modal.Title id="contained-modal-title-vcenter">
            Post A Link
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Link/>
        </Modal.Body>
      </Modal>
    );
}