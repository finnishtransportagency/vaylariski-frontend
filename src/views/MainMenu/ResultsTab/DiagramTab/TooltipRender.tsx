import styles from './TooltipRender.module.css';

export type Props = {
  readonly active: boolean;
  readonly payload: {
    value: string;
    payload: { GDO_GID: string; point_index: number };
  }[];
};

export default function TooltipRender({ active, payload }: Props) {
  if (active && payload && payload.length) {
    // This is built to match how the structure and styling works for a
    // recharts default tooltip
    return (
      <div className={styles.tooltipStyle}>
        <p className={styles.tooltipLabel}>
          RISK_INDEX_SUM: {payload[0].value}
        </p>
        <ul className={styles.tooltipList}>
          <li className={styles.tooltipItem}>
            <span className="recharts-tooltip-item-name">GDO_GID</span>
            <span className="recharts-tooltip-item-separator">: </span>
            <span className="recharts-tooltip-item-value">
              {payload[0].payload.GDO_GID}
            </span>
            <span className="recharts-tooltip-item-unit" />
          </li>
          <li className={styles.tooltipItem}>
            <span className="recharts-tooltip-item-name">Point_index</span>
            <span className="recharts-tooltip-item-separator">: </span>
            <span className="recharts-tooltip-item-value">
              {payload[0].payload.point_index}
            </span>
            <span className="recharts-tooltip-item-unit" />
          </li>
        </ul>
      </div>
    );
  }
  return <></>;
}
