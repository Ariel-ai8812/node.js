import axios from "axios";
import React, { useState } from "react";


function Button() {
  const [showOptions, setShowOptions] = useState(false)
  function rename(){
axios.post()
  }
  return (
    <div className="options-button-container">
      <button
        className="btn btn-warning"
        onClick={() => setShowOptions(!showOptions)}
      >
        🔻
      </button>
      {showOptions && (
        <div className="options-bar">
          <button className="btn btn-secondary" onClick={rename()}>Rename</button>
          <button className="btn btn-secondary">Remove</button>
          <button className="btn btn-secondary">Copy</button>
        </div>
      )}
    </div>
  );
}

export default Button;
