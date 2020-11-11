import React from 'react';
import '../../App.css';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import LeaderboardOptions from '../Lists/Leaderboard-options'
import AddUserToSoc from '../Socs/AddUserToSoc'


class Daily extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:4000/societies/getSocieties')
      .then((response) => {
        this.setState({ societies: response.data.societies })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      societies: [],
      searchValue: '',
      filterBy: ''
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  updateSearch(event) {
    this.setState({ searchValue: event.target.value.substr(0, 20) });
  }

  handleDropdownChange(e) {
    this.setState({ filterBy: e.target.value });
  }

  addUser(soc) {
    AddUserToSoc(soc);
  }

  render() {

    let filteredSocietiesByName = this.state.societies.filter(

      (society) => {
        let filter = this.state.filterBy;
        if (filter == "Name") {
          return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;

        } if (filter == "College") {
          return society.college.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;

        }
        if (filter == "Category") {
          return society.category.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;

        } else {

          return society.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
        }
      }

    );
    return (

      <>
        <div>

          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item href="\">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>All Clubs and Societies</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="search-div">
          <input className="searchbar-nav" type="text" id="mySearch" value={this.state.searchValue} onChange={this.updateSearch.bind(this)} placeholder="Search a Club/Society " title="Type in a category"
          />
          <select id="dropdown" onChange={this.handleDropdownChange} className="filterBox" placeholder="Filter">
            <option value="n/a">All</option>
            <option value="Name">Name</option>
            <option value="College">College</option>
            <option value="Category">Category</option>

          </select>
        </div>

        <LeaderboardOptions />
        
        <div>
          <div className="SocietyLayout">

            {filteredSocietiesByName.map(society => (
              <div key={society.id}>
                <div className="python-card">
                  <a href="/" className="-soc-l-navigation">
                    <h1>{society.name}</h1>
                    <h4>{society.category}</h4>
                    <div >
                      <span>
                        <button className="soc-item-list-join-btn" onClick={() => this.addUser(society.name)}>Join</button>
                        <button className="soc-item-list-visit-btn">Visit</button>
                      </span>
                    </div>
                    {/* <span><button className="soc-item-list-join-btn">Join</button><button className="soc-item-list-visit-btn">Visit</button></span>         */}
                    {/* <h4>{society.college}</h4>          */}
                  </a>
                </div>
              </div>

            ))}
          </div>
        </div>









      </>
    );
  }
}
export default Daily;
