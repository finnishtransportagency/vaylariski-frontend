import { ReactNode, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './CustomTabs.module.css';

type TabOption = {
  readonly label: string;
  readonly content: ReactNode;
};

type Props = {
  readonly style: 'main' | 'inner' | 'riv';
  readonly tabs: TabOption[];
};

export default function CustomTabs({ tabs, style }: Props) {
  if (tabs.length < 1) {
    return <></>;
  }

  let contentClass: string;
  let activeTabClass: string;
  switch (style) {
    case 'main':
      activeTabClass = styles.mainTabActive;
      contentClass = styles.mainTabContent;
      break;
    case 'inner':
    case 'riv':
      activeTabClass = styles.tabActive;
      contentClass = styles.tabContent;
      break;
    default:
      return <></>;
  }

  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(_, value) => setCurrentTab(value)}
        className={styles.tabs}
        variant="scrollable"
        sx={{
          background: 'var(--color-background-white)',
          '.Mui-selected': {
            color: 'var(--color-tab-text) !important',
            fontWeight: 'bold !important',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            label={tab.label}
            id={`${style}-${index}`}
            className={`${styles.tab} ${
              currentTab === index ? `${activeTabClass}` : ''
            }`}
          />
        ))}
      </Tabs>
      <div className={contentClass}>{tabs[currentTab].content}</div>
    </>
  );
}
