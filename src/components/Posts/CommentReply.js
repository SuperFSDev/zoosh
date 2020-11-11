import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Form } from 'react-bootstrap';
import {BiSend} from 'react-icons/bi'
import Avatar from '../Profile/Avatar'


class CommentReply extends React.Component {

  render(){
  return ( 
      <div>
        <Form>
            <Avatar/>
            <input
            id="outlined-textarea"
            className="post-reply"         
            placeholder="Reply to Post..."         
            fullWidth
            required
            multiline
            variant="outlined"
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            />
            <a variant="primary" type="submit"><BiSend size={20}/></a>
        </Form>
      </div>
      
  );
}
}
export default CommentReply;