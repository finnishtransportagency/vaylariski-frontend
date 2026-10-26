import CustomTabs from '../../../components/CustomTab/CustomTabs.tsx';
import DiagramTab from './DiagramTab/DiagramTab.tsx';

import TableTab from './TableTab/TableTab.tsx';

export default function ResultsTab() {
  return (
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
  );
}
