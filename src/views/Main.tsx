import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner.tsx';
import NotificationComponent from '../components/Notification/NotificationComponent.tsx';
import MainMenu from './MainMenu/MainMenu.tsx';
import { Grid } from '@mui/material';
import styles from './Main.module.css';
import Map from './Map/Map.tsx';

export default function Main() {
  return (
    <>
      <NotificationComponent />
      <LoadingSpinner />
      <Grid container spacing={1}>
        <Grid size={4} className={styles.contentWrapper}>
          <MainMenu />
        </Grid>
        <Grid size={8} className={styles.mapWrapper}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}
