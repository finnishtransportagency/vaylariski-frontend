import CustomMap from '../../components/CustomMap/CustomMap.tsx';
import RiskTrafficLights from './RiskTrafficLights.tsx';
import styles from './Map.module.css';
import { Grid } from '@mui/material';

export default function Map() {
  return (
    <Grid container spacing={1}>
      <Grid size={12} className={styles.map}>
        <CustomMap />
      </Grid>
      <Grid size={12} className={styles.trafficLight}>
        <RiskTrafficLights />
      </Grid>
    </Grid>
  );
}
