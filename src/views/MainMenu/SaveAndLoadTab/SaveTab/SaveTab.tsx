import { TextField, Grid } from '@mui/material';
import useBrowserStorage from '../../../../services/BrowserStorage/useBrowserStorage.ts';
import { useState } from 'react';
import { CustomTextButton } from '../../../../components/CustomButton/CustomTextButton.tsx';
import StorageList from '../../../../services/BrowserStorage/StorageList.tsx';

export default function SaveTab() {
  const { saveCurrentSettings, resetSettings } = useBrowserStorage();
  const [saveName, setSaveName] = useState<string | undefined>(undefined);

  return (
    <Grid container size={12} spacing={1}>
      <Grid size={12}>
        <TextField
          label="Parametrikokoelman nimi"
          id="default-parameter-name"
          size="small"
          value={saveName}
          fullWidth
          onChange={(e) => {
            setSaveName(e.target.value ?? undefined);
          }}
        />
      </Grid>
      <Grid size={6}>
        <CustomTextButton
          type="submit"
          label="Lisää kokoelma"
          disabled={!saveName}
          variant="contained"
          onClick={() => {
            if (saveName) {
              saveCurrentSettings(saveName);
            }
          }}
        />
      </Grid>
      <Grid size={6}>
        <CustomTextButton
          type="submit"
          label="Poista kaikki"
          variant="contained"
          onClick={() => {
            resetSettings();
          }}
        />
      </Grid>
      <Grid size={12}>
        <StorageList />
      </Grid>
    </Grid>
  );
}
