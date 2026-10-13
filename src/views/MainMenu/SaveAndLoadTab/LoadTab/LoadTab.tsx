import { Button, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import Changes from './Changes.tsx';
import {
  LoadableName,
  useBrowserStorage,
} from '../../../../services/BrowserStorage/useBrowserStorage.ts';

export default function LoadTab() {
  const { loadableNames, loadName, changes, handleLoad, setLoadName } =
    useBrowserStorage();

  return (
    <Grid container size={12} spacing={1}>
      <Grid size={12}>
        <Grid size={6}>
          <InputLabel
            style={{ fontSize: 14 }}
            id="default-parameter-load-name-label"
          >
            Valitse parametrikokoelma
          </InputLabel>
        </Grid>
        <Grid size={6}>
          <Select
            labelId="default-parameter-load-name-label"
            id="default-parameter-load-name"
            size="small"
            sx={{ width: '100%', height: 40 }}
            style={{ fontSize: 14 }}
            fullWidth
            value={loadName || ''}
            defaultValue={''}
            onChange={(e) => {
              setLoadName(e.target.value ?? undefined);
            }}
          >
            {loadableNames.map((s: LoadableName) => {
              return (
                <MenuItem key={`saves-${s.name}-${s.date}`} value={s.name}>
                  {`${s.name} (${
                    new Date(s.date).toLocaleString('fi-FI', {
                      timeZone: 'Europe/Helsinki',
                    }) || ''
                  })`}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Button
          disabled={loadName === ''}
          variant="contained"
          onClick={handleLoad}
        >
          Lataa parametrit
        </Button>
      </Grid>
      <Grid size={12}>
        <Changes changes={changes} />
      </Grid>
    </Grid>
  );
}
