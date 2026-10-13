import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { Change } from '../../../../services/BrowserStorage/useBrowserStorage.ts';

type TableProps = {
  readonly changes: Change[];
};

export default function Changes({ changes }: TableProps) {
  if (changes.length < 1) {
    return <></>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nimi</TableCell>
            <TableCell align="right">Tämänhetkinen arvo</TableCell>
            <TableCell align="right">Parametrikokoelman arvo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {changes.map((row) => (
            <TableRow
              key={row.property}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.property}
              </TableCell>
              <TableCell align="right">{row.oldValue}</TableCell>
              <TableCell align="right">{row.newValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
