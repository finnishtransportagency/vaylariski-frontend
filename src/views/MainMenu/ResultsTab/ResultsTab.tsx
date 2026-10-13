import CustomTabs from '../../../components/CustomTab/CustomTabs.tsx';
import DiagramTab from './DiagramTab/DiagramTab.tsx';

import styles from './ResultsTab.module.css';
import TableTab from './TableTab/TableTab.tsx';

export default function ResultsTab() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CustomTabs
          style="riv"
          tabs={[
            {
              label: 'RIV taulukko',
              content: <TableTab />,
            },
            {
              label: 'RIV diagrammi',
              content: <DiagramTab />,
            },
          ]}
        />
      </div>
    </div>
  );
}
