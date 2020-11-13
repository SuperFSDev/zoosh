import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {MdLink} from 'react-icons/md'

class ProfileURL extends React.Component {

  componentDidMount() {
    const user = JSON.parse( localStorage.getItem( "user" ) );
    const id = user._id;
    this.setState( { id } );
  }

  state = {
    value: 'test data',
    copied: false,
  };
 
  render() {
    return (
      <div>
        <p value="test"
          onChange={({target: {value}}) => this.setState({value, copied: false})} />

 
        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
        <button className="edit-profile-btn" ><MdLink size={25}/></button>
        </CopyToClipboard>
 
        {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
    );
  }
}

export default ProfileURL;