import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import apiClient from "../http-common";


function TestButton() {
  const [response, setResponse ] = useState({});

  console.log(process.env.REACT_APP_BASE_REST_URL);

  async function clickHander(data) {
    const res = await apiClient.get("app");
    setResponse(res.data);
  };

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <Button onClick={(ev) => clickHander(ev)} >Test button</Button>
  );

};

export default TestButton;