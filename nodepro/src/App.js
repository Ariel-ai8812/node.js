import React, { useState, useEffect } from "react";
import { Folder } from "./Folder";
import "bootstrap/dist/css/bootstrap.min.css";
import URL from "./axios";
import { BeatLoader } from "react-spinners";

function App() {
  const [data, setData] = useState([]);
  const [folder, setFolder] = useState();

  useEffect(() => {
    getFolder();
  }, []);

  async function getFolder() {
    try {
      const res = await URL.get();
      setData(res.data);
      setFolder(true);
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function openFolder(filePath) {
    try {
      const resFolder = await URL.get(`/${filePath}`);
      setData(resFolder.data);
      setFolder(false);
      console.log("path : " + filePath);
      // console.log(filePath);
    } catch (error) {
      console.log("Error path file:", error);
    }
  }

  function change() {
    getFolder();
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome to the home page</h1>
      {!folder && (
        <button className="btn btn-danger" onClick={() => getFolder()}>
          Home
        </button>
      )}

      {!data[0] && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <BeatLoader color="#007BFF" size={20} margin={10} loading={true} />
        </div>
      )}
      {data[0] && (
        <Folder folder={data} change={change} openFile={openFolder} />
      )}
    </div>
  );
  
}

export default App;
