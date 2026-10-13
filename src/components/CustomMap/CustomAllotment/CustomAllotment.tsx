import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import useCustomAllotment from './useCustomAllotment.ts';
import styles from '/CustomAllotment.module.css';

type Props = {
  readonly children: React.ReactNode;
};

export default function CustomAllotment({ children }: Props) {
  const { invalidateMapSize } = useCustomAllotment();
  return (
    <div>
      <Allotment onChange={invalidateMapSize} className={styles.mainWrapper}>
        {children}
      </Allotment>
    </div>
  );
}
