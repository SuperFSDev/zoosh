import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function LayoutTextFields() {
  return (
    <div className="create-a-post">
      <div>
        <TextField
          id="standard-full-width"
          label="Create a Post"
          style={{ margin: 8, fontSize: 10,  }}
          placeholder="Whats on your mind"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div>
            <select className="filterBox" name="category" id="category" required>
                            <option disabled selected="Category" value="choose">Category</option>
                            <option value="Sports">Sports</option>
                            <option value="Music">Music</option>
                            <option value="Politics">Politics</option>
                            <option value="Technology">Technology</option>
                            <option value="Other">Other</option>
            </select>
            <button className="create-post-btn-submit">Post</button>
        </div>
      </div>
    </div>
  );
}