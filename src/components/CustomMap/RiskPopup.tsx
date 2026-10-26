import { Popup } from 'react-leaflet';
import { RivResultProperties } from '../../types/RivResultProperties.ts';
import styles from './RiskPopup.module.css';

type Props = {
  readonly result: RivResultProperties;
};

export default function RiskPopup({ result }: Props) {
  return (
    <Popup>
      <pre>
        Indeksi: {result.point_index}
        <br />
        GDO_GID: {result.GDO_GID}
        <br />
        VAYLAT: {result.VAYLAT}
        <div className={styles.headerContainer}>
          <hr className={styles.header} />
          <span className={styles.headerSpan}>
            <b>Riskiarvot</b>
          </span>
          <hr className={styles.header} />
        </div>
        RIV summa: {result.RISK_INDEX_SUM}
        <br />
        RIV väylä: {result.RIV_1_channel}
        <br />
        RIV mutka: {result.RIV_2_bend}
        <br />
        RIV S-mutka: {result.RIV_3_s_bend}
        <br />
        RIV U-mutka: {result.RIV_3_u_bend}
        <br />
        RIV liikenne: {result.RIV_4_traffic_complexity}
        <br />
        RIV heikentynyt näkyvyys: {result.RIV_5_reduced_visibility}
        <br />
        RIV taustavalon voimakkuus: {result.RIV_6_light_pollution}
        <div className={styles.headerContainer}>
          <hr className={styles.header} />
          <span className={styles.headerSpan}>
            <b>Toistuvuustekijät (PF)</b>
          </span>
          <hr className={styles.header} />
        </div>
        Väylän toistuvuus: {result.PF_1_channel}
        <br />
        Mutkan toistuvuus: {result.PF_2_bend}
        <br />
        S-mutkan toistuvuus: {result.PF_3_s_bend}
        <br />
        U-mutkan toistuvuus: {result.PF_3_u_bend}
        <br />
        Liikenteen toistuvuus: {result.PF_4_traffic_complexity}
        <br />
        Heikentyneen näkyvyyden toistuvuus: {result.PF_5_reduced_visibility}
        <br />
        Taustavalon toistuvuus: {result.PF_6_light_pollution_value}
        <div className={styles.headerContainer}>
          <hr className={styles.header} />
          <span className={styles.headerSpan}>
            <b>Vaikuttavuustekijät (W)</b>
          </span>
          <hr className={styles.header} />
        </div>
        Aallon korkeuden vaikuttavuus: {result.W_wave_height}
        <br />
        ATN vaikuttavuus: {result.W_atn}
        <br />
        Nopeuden vaikuttavuus: {result.W_speed}
        <br />
        Ohjailtavuuden vaikuttavuus: {result.W_manoeuvrability}
        <br />
        Pitkittäisvirtauksen vaikuttavuus: {result.W_longitudinal_current}
        <br />
        Pohjan vaikuttavuus: {result.W_bottom_surface}
        <br />
        Poikkivirtauksen vaikuttavuus: {result.W_cross_current}
        <br />
        Reunan vaikuttavuus: {result.W_bank_clearance}
        <br />
        Syvyyden vaikuttavuus: {result.W_channel_depth}
        <br />
        Tuulen vaikuttavuus: {result.W_wind}
        <br />
        <div className={styles.headerContainer}>
          <hr className={styles.header} />
          <span className={styles.headerSpan}>
            <b>Väylän ominaisuudet</b>
          </span>
          <hr className={styles.header} />
        </div>
        Väylän leveys [m]: {result.W_channel}
        <br />
        Väylän syvyys [m]: {result.channel_depth_value}
        <br />
        S-mutka [m]: {result.bend_S_length}
        <br />
        U-mutka [m]: {result.bend_U_length}
        <br />
        Mutkan suuntakulma [°]: {result.bend_angle}
        <br />
        Mutkan säde [m]: {result.bend_radius}
        <br />
        PF_bend1: {result.PF_bend1}
        <br />
        PF_bend2: {result.PF_bend2}
        <br />
        BSI: {result.BSI}
        <br />
      </pre>
    </Popup>
  );
}
