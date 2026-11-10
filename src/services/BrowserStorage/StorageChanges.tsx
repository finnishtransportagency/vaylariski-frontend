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
import { BrowserSettingsContextData } from '../../types/BrowserSettingsContextData.ts';
import { RISK_CHANGES } from '../../types/RiskSettings.ts';

type Props = {
  readonly collection?: BrowserSettingsContextData;
};

export default function StorageChanges({ collection }: Props) {
  if (!collection) {
    return <></>;
  }
  const { riskSettings: current } = useRiskSettings();

  const changes = RISK_CHANGES.map((change) => ({
    name: change.name,
    current: change.value(current),
    collection: change.value(collection.settings),
  })).filter((change) => change.collection !== change.current);

  if (changes.length < 1) {
    return <CustomText textAlign="center" label="Ei muutoksia" style="big" />;
  }
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
            <TableCell align="center">
              <CustomText label={`Kokoelma ${collection.name}`} style="big" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {changes.map((change) => (
            <TableRow
              key={change.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                <CustomText label={change.name} style="medium" />
              </TableCell>
              <TableCell align="center">
                <CustomText label={change.current} style="medium" />
              </TableCell>
              <TableCell align="center">
                <CustomText label={change.collection} style="medium" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
