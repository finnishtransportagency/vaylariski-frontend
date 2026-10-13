import { ReactNode } from 'react';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button } from '@mui/material';

export type Props = {
  readonly icon: 'filter' | 'week';
  readonly label: string;
  readonly onClick: () => void;
};

export function CustomIconButton({ icon, label, onClick }: Props) {
  let IconComponent: ReactNode;
  switch (icon) {
    case 'filter':
      IconComponent = <FilterAltIcon />;
      break;
    case 'week':
      IconComponent = <ViewWeekIcon style={{ marginRight: 3 }} />;
    default:
      return <></>;
  }

  return (
    <Button variant="contained" sx={{ mb: 1, mt: 1, ml: 1 }} onClick={onClick}>
      {IconComponent}
      {label}
    </Button>
  );
}
