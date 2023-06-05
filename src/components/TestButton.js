import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import apiClient from "../http-common";

function TestButton() {
  const [response, setResponse] = useState({});

  async function clickHander() {
    console.log("backend:", process.env.REACT_APP_BASE_REST_URL);
    const res = await apiClient.get("app");
    setResponse(res.data);
  }

  useEffect(() => {
    console.log(response);
  }, [response]);

  return <Button onClick={() => clickHander()}>Test button</Button>;
}

export default TestButton;
