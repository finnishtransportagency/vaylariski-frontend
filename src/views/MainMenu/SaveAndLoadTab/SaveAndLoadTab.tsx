import CustomTabs from '../../../components/CustomTab/CustomTabs.tsx';
import LoadTab from './LoadTab/LoadTab.tsx';
import SaveTab from './SaveTab/SaveTab.tsx';

export default function SaveAndLoadTab() {
  return (
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
  );
}
