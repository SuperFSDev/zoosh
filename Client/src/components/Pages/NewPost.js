import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import {Helmet} from 'react-helmet'

export default class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         
        };
      }

    componentDidMount() {
      document.body.style.backgroundColor = "#f0f2f5";
    
    }

render(){

  return (
     <div>
       {/* REACTJS HELMET */}
       <Helmet>
                <meta charSet="utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>New Post - Website</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">

          <input placeholder="Title ..." className="Title-input"/><br/>
          <textarea placeholder="Write your post content here ..." className="Content-input" rows = "5" cols = "60"/>
          <button className="standard-button">Publish</button>
   
        </div>
      </div>
  </div>
  );
}
}
