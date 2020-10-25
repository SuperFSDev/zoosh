import React from 'react';
import '../../App.css';
import DesignData from '../../data/design.json'
import { FiCopy } from 'react-icons/fi';
import { getParameters } from "codesandbox/lib/api/define";
import axios from 'axios';

class DailyUi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      problems: [],
    };

  } 
  

  componentDidMount() {
    axios.get('http://localhost:4000/api/problems')
    .then((response)=>{
        this.setState({problems: response.data.problems})
    })
    .catch((error)=>{
        console.log(error);
    });
  }

  onSubmit(e){

    e.preventDefault();

    const parameters = getParameters({
      files: {
        "package.json": {
          content: {
            dependencies: {
              react: "latest",
              "react-dom": "latest"
            }
          }
        },
        "index.js": {
        },
        "index.html": {
        },
        "main.css": {
        }
      }
    });
  
    document.body.innerHTML = `
      <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
      <input type="hidden" name="parameters" value="${parameters}" />
      <input type="submit" value="Open in sandbox" />
    </form>
    `;
  }

    render(){
      var{problems} = this.state;


      return (
        <>
            <div className="spacing"></div>
            <div className="daily-card">
            {problems.map(problem =>  (
            <div>
              <h1>{problem.title}</h1>
              <p>{problem.content}</p>
            </div>
            ))}  
            <button className="btn-sandbox" onClick={this.onSubmit}>Create in Sandbox</button>
            <button className="btn-copy">Copy <FiCopy/></button>
            </div>
        </>
      );
    }
}

export default DailyUi;
