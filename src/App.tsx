import { createTheme, Grid, ThemeProvider } from '@mui/material';
import { Row, Col, Container } from 'react-bootstrap';

import { CSSColorCode } from './types/CSSColorCode.ts';
import Main from './views/Main.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import { SpinnerProvider } from './contexts/SpinnerContext.tsx';
import { RiskSettingProvider } from './contexts/RiskSettingsContext.tsx';
import { ChannelProvider } from './contexts/NewChannelContext.tsx';
import { DefaultShipProvider } from './contexts/NewBoatContext.tsx';
import { WayareaProvider } from './contexts/NewWayareaContext.tsx';
import { RiskProvider } from './contexts/NewRiskContext.tsx';
import { UserSelectionProvider } from './contexts/NewUserSelectionContext.tsx';
import styles from './App.module.css';
import packageJson from '../package.json';
import { CustomText } from './components/CustomText/CustomText.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: CSSColorCode.BLUE_100,
      light: CSSColorCode.LIGHT_BLUE_100,
      dark: CSSColorCode.DARK_BLUE_100,
    },
    success: {
      main: CSSColorCode.GREEN_100,
      light: CSSColorCode.LIGHT_GREEN_100,
    },
    error: {
      main: CSSColorCode.RED_100,
    },
    info: {
      main: CSSColorCode.BLUE_100,
    },
  },
  typography: {
    fontFamily: `"Exo 2 Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        className={styles.App}
        style={{
          minWidth: 1210,
        }}
      >
        <header>
          <Grid container className={styles.AppHeader}>
            <Grid size={11}>
              <p className={styles.AppLogo}>
                <img
                  style={{ height: '1.5em' }}
                  src="/vaylariski_logo_no_text.png"
                  alt="logo"
                />
                VäyläRiski
              </p>
            </Grid>
            <Grid
              size={1}
              sx={{ alignItems: 'center', justifyContent: 'right' }}
            >
              <h5>Versio {packageJson.version}</h5>
            </Grid>
          </Grid>
        </header>
        <div className={styles.AppContent}>
          <RiskProvider>
            <RiskSettingProvider>
              <SpinnerProvider>
                <NotificationProvider>
                  <ChannelProvider>
                    <WayareaProvider>
                      <DefaultShipProvider>
                        <UserSelectionProvider>
                          <Main />
                        </UserSelectionProvider>
                      </DefaultShipProvider>
                    </WayareaProvider>
                  </ChannelProvider>
                </NotificationProvider>
              </SpinnerProvider>
            </RiskSettingProvider>
          </RiskProvider>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
