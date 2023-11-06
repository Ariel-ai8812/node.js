import React, { useState, useRef } from "react";
import URL from "./axios";

function Button(props) {
  const [showRenameInput, setShowRenameInput] = useState(false);
  const newName = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const { name } = props;

  function handleRename() {
    const newFileName = newName.current.value;
    console.log("New name:", newFileName);
    setShowRenameInput(false);
    renameFile(name, newFileName);
  }

  const renameFile = async (oldName, newName) => {
    try {
      const response = await URL.post(`/rename/${oldName}/${newName}`);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const deleteFile = async (nameDel) => {
    try {
      console.log(nameDel);
      const response = await URL.delete(`/delete/${nameDel}`);
      console.log(response);
      props.change();
    } catch (error) {
      console.log("Error delete file:", error);
    }
  };

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
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowRenameInput(true);
            }}
          >
            Rename
          </button>
          {showRenameInput && (
            <div>
              {console.log(name)}
              <input ref={newName} type="text" placeholder="New Name..." />
              <button onClick={handleRename}>Confirm Rename</button>
            </div>
          )}
          <button
            onClick={() => deleteFile(name)}
            className="btn btn-secondary"
          >
            Remove
          </button>
          <button className="btn btn-secondary">Copy</button>
        </div>
      )}
    </div>
  );
}

export default Button;
