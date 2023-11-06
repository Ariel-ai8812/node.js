import React, { useState, useEffect } from "react";
import { Folder } from "./Folder";
import "bootstrap/dist/css/bootstrap.min.css";
import URL from "./axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getFolder();
  }, []);

  async function getFolder() {
    try {
      const res = await URL.get();
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function change() {
    console.log("c");
    getFolder();
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>wellcome to home page</h1>
      <button>+</button>
      {/* {console.log(data)} */}
      {data[0] && <Folder folder={data} change={change} />}
    </div>
  );
}

export default App;
