import { Grid } from '@mui/material';
import useBrowserStorage from '../../../../services/BrowserStorage/useBrowserStorage.ts';
import CustomSelect from '../../../../components/CustomSelect/CustomSelect.tsx';
import { useState } from 'react';
import { CustomTextButton } from '../../../../components/CustomButton/CustomTextButton.tsx';
import { BrowserSettingsContextData } from '../../../../types/BrowserSettingsContextData.ts';
import StorageChanges from '../../../../services/BrowserStorage/StorageChanges.tsx';

export default function LoadTab() {
  const { current, options, restoreSettings } = useBrowserStorage();
  const [selected, setSelected] = useState<string>(current.name);

  function getLabel(option: BrowserSettingsContextData): string {
    const dateString: string | undefined = option.date?.toLocaleString(
      'fi-FI',
      { timeZone: 'Europe/Helsinki' }
    );
    return dateString ? `${option.name} (${dateString})` : option.name;
  }

  return (
    <Grid container size={12} spacing={1}>
      <Grid size={12}>
        <CustomSelect<string>
          id="load-storage"
          label="Lataa parametrit"
          options={options.map((option) => ({
            value: option.name,
            label: getLabel(option),
          }))}
          value={selected}
          onChange={(value) => {
            if (!!value) {
              setSelected(value);
            }
          }}
        />
      </Grid>
      <Grid size={12}>
        <CustomTextButton
          type="submit"
          label="Lataa parametrikokoelma"
          disabled={!selected}
          variant="contained"
          onClick={() => {
            if (selected) {
              restoreSettings(selected);
            }
          }}
        />
      </Grid>

      <Grid size={12}>
        <StorageChanges
          collection={options.find((option) => option.name === selected)}
        />
      </Grid>
    </Grid>
  );
}
