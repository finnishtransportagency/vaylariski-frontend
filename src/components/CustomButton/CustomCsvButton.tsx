import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { CSVLink } from 'react-csv';

export type Props = {
  readonly label: string;
  readonly fileName: string;
  readonly data: ({} | undefined)[][];
};

export function CustomCsvButton({ label, fileName, data }: Props) {
  return (
    <Button variant="contained" sx={{ mb: 1, mt: 1, ml: 1 }}>
      <CSVLink
        data={data}
        filename={fileName}
        separator={';'}
        style={{ color: 'white' }}
      >
        <DownloadIcon />
        {label}
      </CSVLink>
    </Button>
  );
}
