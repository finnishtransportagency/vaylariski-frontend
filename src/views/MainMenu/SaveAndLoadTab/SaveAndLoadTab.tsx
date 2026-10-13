import CustomTabs from '../../../components/CustomTab/CustomTabs.tsx';
import LoadTab from './LoadTab/LoadTab.tsx';
import SaveTab from './SaveTab/SaveTab.tsx';
import styles from './SaveAndLoadTab.module.css';

export default function SaveAndLoadTab() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CustomTabs
          style="inner"
          tabs={[
            {
              label: 'Lataa',
              content: <LoadTab />,
            },
            {
              label: 'Tallenna',
              content: <SaveTab />,
            },
          ]}
        />
      </div>
    </div>
  );
}
