import { ReactNode, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './CustomTabs.module.css';
import { useCustomTab } from '../../contexts/CustomTabContext.tsx';

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

  const { mainTab, setMainTab } = useCustomTab();
  const [defaultTab, setDefaultTab] = useState<number>(0);

  let currentTab: number;
  let setTab: (tab: number) => void;
  let tabHeaderClass: string;
  let contentClass: string;
  let activeTabClass: string;
  switch (style) {
    case 'main':
      currentTab = mainTab;
      setTab = setMainTab;
      tabHeaderClass = styles.mainTabs;
      activeTabClass = styles.mainTabActive;
      contentClass = styles.mainTabContent;
      break;
    case 'inner':
    case 'riv':
      currentTab = defaultTab;
      setTab = setDefaultTab;
      tabHeaderClass = styles.tabs;
      activeTabClass = styles.tabActive;
      contentClass = styles.tabContent;
      break;
    default:
      return <></>;
  }

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={(_, value) => setTab(value)}
        className={tabHeaderClass}
        variant="scrollable"
        sx={{
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
