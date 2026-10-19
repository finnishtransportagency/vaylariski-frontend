import Box from '@mui/material/Box';

import SaveAndLoadTab from './SaveAndLoadTab/SaveAndLoadTab.tsx';
import RiskParametersTab from './RiskParametersTab/RiskParametersTab.tsx';
import CustomTabs from '../../components/CustomTab/CustomTabs.tsx';
import styles from './MainMenu.module.css';
import { useEffect } from 'react';
import useBackend from '../../services/Backend/useBackend.ts';
import ResultsTab from './ResultsTab/ResultsTab.tsx';
import { CustomTextButton } from '../../components/CustomButton/CustomTextButton.tsx';
import { wayareaNameToString } from '../../types/WayareaName.ts';
import { useRiskSettings } from '../../contexts/RiskSettingsContext.tsx';

export default function MainMenu() {
  const { channel } = useRiskSettings();
  const { refreshMainPage, calculateRisks } = useBackend();

  useEffect(() => {
    (async () => {
      await refreshMainPage();
    })();
  }, []);

  return (
    <Box className={styles.mainMenu}>
      <CustomTabs
        style="main"
        tabs={[
          { label: 'Parametrit', content: <RiskParametersTab /> },
          { label: 'Parametrikokoelmat', content: <SaveAndLoadTab /> },
          { label: 'Tulokset', content: <ResultsTab /> },
        ]}
      />
      <CustomTextButton
        type="submit"
        label={
          channel.selected_channel
            ? `Laske riski väylälle ${wayareaNameToString(channel.selected_channel)}`
            : 'Valitse väylä'
        }
        onClick={async () => await calculateRisks()}
        disabled={!channel.selected_channel}
      />
    </Box>
  );
}
