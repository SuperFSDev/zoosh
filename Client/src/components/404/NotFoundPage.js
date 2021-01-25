import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../../images/404.png'
import {Image} from 'react-bootstrap'

class NotFoundPage extends React.Component{
    render(){
        return <div>
            <Image src={Error} width={500} style={{justifyContent:'center', display:'block', alignItems: 'center', margin:"auto", marginTop:100}}/>
            <p style={{textAlign:"center", marginTop:100}}>
              <Link to="/">404 Not Found </Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;