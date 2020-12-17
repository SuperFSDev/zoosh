import React from 'react';
import '../../App.css';
import 'react-calendar/dist/Calendar.css';
import FeedOptions from '../Lists/FeedOptions'
import {Helmet} from 'react-helmet'


export default class Podcasts extends React.Component {

    
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
                <title>Podcasts</title>
        </Helmet> 

      <div className="containerFeedLeft">
        <FeedOptions/>
      </div>

      <div className="containerFeedMiddle">
          <div className="global-feed">
          <h1>Podcasts</h1>
            <div>
              <div className="EventSocietyLayout">
              
            </div>
            </div>
        </div>
      </div>
  </div>
  );
}
}