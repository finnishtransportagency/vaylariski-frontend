import BoatTab from './BoatTab/BoatTab.tsx';
import ChannelTab from './ChannelTab/ChannelTab.tsx';
import EnvironmentTab from './EnvironmentTab/EnvironmentTab.tsx';
import MultipliersTab from './MultipliersTab/MultipliersTab.tsx';
import BendTab from './BendTab/BendTab.tsx';
import CustomTabs from '../../../components/CustomTab/CustomTabs.tsx';

export default function RiskParametersTab() {
  return (
    <CustomTabs
      style="inner"
      tabs={[
        {
          label: 'Väylä',
          content: <ChannelTab />,
        },
        {
          label: 'Alus',
          content: <BoatTab />,
        },
        {
          label: 'Olosuhteet ja vaikuttavat tekijät',
          content: <EnvironmentTab />,
        },
        {
          label: 'Yleiset kertoimet',
          content: <MultipliersTab />,
        },
        {
          label: 'Mutkien kertoimet',
          content: <BendTab />,
        },
        // {
        //   label: 'Navigointilinjojen valinnaiset parametrit',
        //   content: <OverrideTab values={input} onChange={() => {}} />,
        // },
      ]}
    />
  );
}
