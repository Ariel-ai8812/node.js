import React from "react";
import "./App.css";
import Button from "./Button";
import Info from "./Info.jsx";
import Show from "./Show.js";
// import URL from "./axios.jsx";

export function Folder(props) {
  

  return (
    <div className="folder-grid">
      {props.folder.map((element) => (
        <div key={element.name} className="folder-item">
          <div className="folder-icon"></div>
          <div style={{ fontStyle: "italic", fontSize: "1vw" }}>
            {element.name}
          </div>
         {element.type !== "Directory" && <Show name ={element.name}/>} 
          {element.type === "Directory" && (
            <button
              onClick={() => props.openFile(element.name)}
              className="btn btn-success"
              style={{ margin: "2px" }}
            >
              open
            </button>
          )}
          <div style={{ margin: "0.5vw" }}>
            <Info
              type={element.type}
              size={element.size}
              creat={element.createdAt}
            />
          </div>
          <div style={{ margin: "0.5vw" }}>
            <Button name={element.name} change={props.change} />
          </div>
        </div>
      ))}
    </div>
  );
}
