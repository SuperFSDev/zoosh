import React from "react";
import Dropzone from "react-dropzone";
import ReactAvatarEditor from "react-avatar-editor";

class ImageComposer extends React.Component {
  state = {
    image: "avatar.jpg",
    scale: 1,
    preview: null
  };

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    //const img = this.editor.getImage().toDataURL();

    this.setState({
      preview: {
        img
      }
    });
  };

  handleScale = e => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  setEditorRef = editor => {
    if (editor) this.editor = editor;
  };

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] });
  };

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleDrop}
          disableClick={true}
          multiple={false}
          style={{
            width: this.state.width,
            height: this.state.height,
            marginBottom: "35px"
          }}
        >
          <div>
            <ReactAvatarEditor
              ref={this.setEditorRef}
              scale={parseFloat(this.state.scale)}
              width={150}
              height={150}
              rotate={0}
              border={25}
              image={this.state.image}
              className="editor-canvas"
            />
          </div>
        </Dropzone>
        <br />
        New File:
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? "0.1" : "1"}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        <br />
        <input type="button" onClick={this.handleSave} value="Preview" />
        <br />
        {!!this.state.preview && <img src={this.state.preview.img} />}
      </div>
    );
  }
}

export default ImageComposer;