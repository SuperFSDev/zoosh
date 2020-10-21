import React from 'react';
import '../../App.css';
import DesignData from '../../data/design.json'
import { FiCopy } from 'react-icons/fi';
import { getParameters } from "codesandbox/lib/api/define";

class DailyUi extends React.Component {

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
      return (
        <>
            <div className="spacing"></div>
            <div className="daily-card">
              {DesignData.map((postDetail, index)=>{
                return <div>
                    <h1>{postDetail.title}</h1>
                    <div className="spacing"/>
                    <p>{postDetail.content}</p>
                </div>
              })}
            <button className="btn-sandbox" onClick={this.onSubmit}>Create in Sandbox</button>
            <button className="btn-copy">Copy <FiCopy/></button>
            </div>
        </>
      );
    }
}

export default DailyUi;
