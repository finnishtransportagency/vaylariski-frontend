import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { CustomText } from '../../components/CustomText/CustomText.tsx';
import { useRiskSettings } from '../../contexts/RiskSettingsContext.tsx';
import { RISK_CHANGES } from '../../types/RiskSettings.ts';

export default function StorageList() {
  const { riskSettings: current } = useRiskSettings();
  if (!current) {
    return <></>;
  }

  const values = RISK_CHANGES.map((change) => ({
    name: change.name,
    current: change.value(current),
  }));

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <CustomText label="Parametri" style="big" />
            </TableCell>
            <TableCell align="center">
              <CustomText label="Arvo" style="big" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value) => (
            <TableRow
              key={value.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                <CustomText label={value.name} style="medium" />
              </TableCell>
              <TableCell align="center">
                <CustomText label={value.current} style="medium" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
