import { Button, TextField, InputLabel, Grid } from '@mui/material';
import { useBrowserStorage } from '../../../../services/BrowserStorage/useBrowserStorage.ts';

export default function SaveTab() {
  const { saveName, handleSave, setSaveName } = useBrowserStorage();

  return (
    <Grid container size={12} spacing={1}>
      <Grid size={12}>
        <Grid size={6}>
          <InputLabel
            style={{ fontSize: 14 }}
            id="default-parameter-name-label"
          >
            Anna parametrikokoelmalle nimi
          </InputLabel>
        </Grid>
        <Grid size={6}>
          <TextField
            id="default-parameter-name"
            size="small"
            value={saveName}
            fullWidth
            onChange={(e) => {
              setSaveName(e.target.value ?? undefined);
            }}
          />
        </Grid>
      </Grid>
      <Grid size={12}>
        <Button disabled={!saveName} variant="contained" onClick={handleSave}>
          Tallenna parametrikokoelma
        </Button>
      </Grid>
    </Grid>
  );
}
