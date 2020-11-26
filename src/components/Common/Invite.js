import React, { Component } from "react"

export default class YourComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      copySuccess: false
    }
  }

  copyCodeToClipboard = () => {
    const el = this.input
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
  }

  render() {
    return (
      <div className="copy-container">
        <div>
          <input
            className="invite-url"
            readonly="readonly"
            ref={(input) => this.input = input}
            value="localhost:3000/join"
            readonly={true}
          />
          <button className="copy-btn-to-clipboard" onClick={() => this.copyCodeToClipboard()}>
            Copy
          </button>
          {
            this.state.copySuccess ?
            <div style={{"color": "green"}}>
              Success!
            </div> : null
          }
        </div>
      </div>
    )
  }
}