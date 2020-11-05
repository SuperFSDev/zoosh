import React from 'react';
import '../../App.css';
import { Breadcrumb } from 'react-bootstrap'
import Breadcrumbs from '../Common/Breadcrumbs'

class JoinSocs extends React.Component {
    render(){
        return(
            <>
            {/* <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item href="\" className="-breadcrumb-setting">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active className="-breadcrumb-setting">Join a Club or Society</Breadcrumb.Item>
            </Breadcrumb> */}
          <Breadcrumbs/>
            
            <div className="create-a-soc">

            </div>
            </>
        );
    }
}

export default JoinSocs;
