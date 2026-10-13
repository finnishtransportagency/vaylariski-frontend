import Box from '@mui/material/Box';

import SaveAndLoadTab from './SaveAndLoadTab/SaveAndLoadTab.tsx';
import RiskParametersTab from './RiskParametersTab/RiskParametersTab.tsx';
import CustomTabs from '../../components/CustomTab/CustomTabs.tsx';
import styles from './MainMenu.module.css';
import { useEffect } from 'react';
import useBackend from '../../services/Backend/useBackend.ts';
import { useDefaultShip } from '../../contexts/NewBoatContext.tsx';
import { useWayarea } from '../../contexts/NewWayareaContext.tsx';
import ResultsTab from './ResultsTab/ResultsTab.tsx';
import { CustomTextButton } from '../../components/CustomButton/CustomTextButton.tsx';
import { WayareaName, wayareaNameToString } from '../../types/WayareaName.ts';
import { useUserInput } from '../../contexts/UserInputContext.tsx';
import { useChannel } from '../../contexts/NewChannelContext.tsx';
import { useRisk } from '../../contexts/NewRiskContext.tsx';
import { useNotification } from '../../contexts/NotificationContext.tsx';

export default function MainMenu() {
  const { userInput } = useUserInput();
  const { updateDefaultShips } = useDefaultShip();
  const { selected, updateWayareaNames } = useWayarea();
  const {
    fetchAllDefaultShips,
    fetchWayareaNames,
    fetchNavigationlineChannel,
    fetchNavigationlineRisk,
  } = useBackend();
  const { setChannelArea } = useChannel();
  const { setRIVResult } = useRisk();
  const { setNotificationStatus } = useNotification();

  async function calculateRisk(selected?: WayareaName) {
    if (!selected) return;
    const channel = await fetchNavigationlineChannel(selected.VAYLAT);
    const risk = await fetchNavigationlineRisk(selected.VAYLAT, userInput);

    setChannelArea(channel);
    setRIVResult(risk);
    if (!!channel && !!risk) {
      setNotificationStatus({
        severity: 'success',
        message: `Väylän ${wayareaNameToString(selected)} riski on laskettu`,
        visible: true,
      });
    }
  }

  useEffect(() => {
    (async () => {
      const defaultShips = await fetchAllDefaultShips();
      const wayareaNames = await fetchWayareaNames();
      updateDefaultShips(defaultShips);
      updateWayareaNames(wayareaNames);
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
          selected
            ? `Laske riski väylälle ${wayareaNameToString(selected)}`
            : 'Valitse väylä'
        }
        onClick={async () => await calculateRisk(selected)}
        disabled={!selected}
      />
    </Box>
  );
}
