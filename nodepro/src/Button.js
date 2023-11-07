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
    renameFile(name, newFileName);
    setShowRenameInput(false);
  }

  const renameFile = async (oldName, newName) => {
    try {
      await URL.put(`/rename`, { oldName, newName });
      await props.change();
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  };

  const deleteFile = async (nameDel) => {
    try {
      await props.change();
      await URL.delete(`/delete/${nameDel}`);
    } catch (error) {
      console.log("Error delete file:", error);
    }
  };

  const copyFile = async (name) => {
    try {
      await URL.post(`/copy/${name}`);
      await props.change();
    } catch (error) {
      console.log("Error copy file:", error);
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
        <div className="options-bar" style={{ position: "absolute" }}>
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
          <button onClick={() => copyFile()} className="btn btn-secondary">
            Copy
          </button>
        </div>
      )}
    </div>
  );
}

export default Button;
