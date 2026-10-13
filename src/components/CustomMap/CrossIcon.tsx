import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';
import { CSSColorCode } from '../../types/CSSColorCode.ts';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

export type Props = {
  readonly color: 'red' | 'green' | 'yellow' | 'gray';
};

// When comparing routeline and navigationline the cross sign is used instead of circle
export function CrossIcon({ color }: Props) {
  let colorCode: string;
  switch (color) {
    case 'red':
      colorCode = CSSColorCode.RED_100;
    case 'green':
      colorCode = CSSColorCode.GREEN_100;
    case 'yellow':
      colorCode = CSSColorCode.YELLOW_100;
    default:
      colorCode = '#83888a';
  }
  return divIcon({
    className: 'material-icon',
    html: renderToString(
      <div>
        <CloseSharpIcon style={{ color: colorCode, fontSize: '0.75rem' }} />
      </div>
    ),
    iconAnchor: [6.5, 9], // This is the spot where the circle markers are anchored by default (approx)
  });
}
