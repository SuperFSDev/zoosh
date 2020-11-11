import React from 'react';
import '../../App.css';
import Avatar from '../Profile/Avatar'
import addUserToSoc from '../Socs/AddUserToSoc';

class Recommended extends React.Component {

    /*async addUserToSoc (soc) {

        const addUser = {
            society: soc,
            user: JSON.parse(localStorage.getItem('user'))
        }

        await axios.post('http://localhost:4000/societies/update', addUser)
                .then(function(resp) {
                    console.log(resp);
                    alert("Successfully joined " + soc);
                })
                .catch(function(error){
                    console.log(error);
                })
    }*/

    addUser(soc){
        addUserToSoc(soc);
    }

    render() {
        return (
            <div>
                <h2>Recommended Groups</h2>
                <hr className="-recommended-hr-style" />
                <div className="recommended-item">
                    <h4 class="recommended-society-name">Computer Science</h4>
                    <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join" onClick={() => this.addUser('Computer Science')}>Join</button></span>
                </div>
                <div className="recommended-item">
                    <h4>Rowing Club</h4>
                    <span className="Join-option"><p id="left-item-join">NUIG</p><button id="right-item-join" onClick={() => this.addUser('Rowing Club')}>Join</button></span>

                </div>
                <div className="recommended-item">
                    <h4>Gaming Society</h4>
                    <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join" onClick={() => this.addUser('Gaming Society')}>Join</button></span>
                </div>
                <div className="see-all-item">
                    <br />
                    <a href="/list-of-clubs-and-societies">See All</a>
                </div>
                <div className="spacing"></div>

                {/* <h2>People to Follow</h2>
        <hr className="-recommended-hr-style"/>
        <div className="recommended-item">
            <h4 class="recommended-society-name">Aaron Moran</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Follow</button></span>
        </div>
        <div className="recommended-item">
            <h4>Conor Shortt</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Follow</button></span>
            
        </div>
        <div className="recommended-item">
            <h4>Thomas Kenny</h4>
            <span className="Join-option"><p id="left-item-join">GMIT</p><button id="right-item-join">Follow</button></span>
        </div>
        <div className="see-all-item">
            <br/>
            <a href="/list-of-clubs-and-societies">See All</a>
        </div> */}
            </div>
        );
    }
}

export default Recommended;