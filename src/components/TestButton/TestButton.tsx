import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import useBackend from '../../services/Backend/useBackend.ts';
import { TestResult } from '../../types/TestResult.ts';

export default function TestButton() {
  const [response, setResponse] = useState<TestResult>();
  const { fetchTest } = useBackend();

  async function clickHander() {
    setResponse(await fetchTest());
  }

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <Button variant="text" onClick={clickHander}>
      Test button
    </Button>
  );
}
