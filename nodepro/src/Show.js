import { useState } from "react";
import URL from "./axios";

function Show(props) {
  const [data, setData] = useState();

  const showDet = async (file) => {
    try {
      const res = await URL.get(`/${file}`);
      if (res.data !== "") {
        res.data = res.data;
      } else res.data = "is empty";
      setData(res.data);
    } catch (error) {
      console.log("Error show file:", error);
    }
  };

  const resetData = () => {
    setData(null);
  };

  return (
    <div>
      {!data && (
        <button
          onClick={() => {
            showDet(props.name);
          }}
          className="btn btn-primary"
        >
          Show
        </button>
      )}
      {data && (
        <div>
          <button onClick={resetData} className="btn btn-secondary">
            Back
          </button>
          <div>{data}</div>
        </div>
      )}
    </div>
  );
}

export default Show;
