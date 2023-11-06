import React, { useState } from "react";

function Info(props) {
  const [infoVisible, setInfoVisible] = useState(false);

  function toggleInfo() {
    setInfoVisible(!infoVisible);
  }

  const infoStyle = {
    position: "absolute",
    top: -50,
    left: 0,
    width: "100%",
    display: infoVisible ? "block" : "none",
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={toggleInfo} className="btn btn-info">
        Info
      </button>
      <div
        style={infoStyle}
        className="alert alert-info"
        onClick={toggleInfo}
      >
        <p><strong>Type:</strong> {props.type}</p>
        <p><strong>Size:</strong> {props.size}</p>
        <p><strong>Created:</strong> {props.creat}</p>
      </div>
    </div>
  );
}

export default Info;