import { ReactNode } from 'react';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

export type Props = {
  readonly icon: 'filter' | 'week' | 'clear';
  readonly onClick: () => void;
  readonly color?: 'success' | 'error';
};

export function CustomIconButton({ icon, onClick, color }: Props) {
  let IconComponent: ReactNode;
  switch (icon) {
    case 'filter':
      IconComponent = <FilterAltIcon />;
      break;
    case 'week':
      IconComponent = <ViewWeekIcon style={{ marginRight: 3 }} />;
      break;
    case 'clear':
      IconComponent = <ClearIcon />;
      break;
    default:
      return <></>;
  }

  return (
    <IconButton color={color} onClick={onClick}>
      {IconComponent}
    </IconButton>
  );
}
