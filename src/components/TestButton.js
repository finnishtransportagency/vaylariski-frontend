import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import apiClient from "../http-common";


function TestButton() {
  const [response, setResponse ] = useState({});

  async function clickHander(data) {
    const res = await apiClient.get("/");
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