import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { CustomTextButton } from '../CustomButton/CustomTextButton.tsx';

export type Item<I> = {
  readonly id: I;
  readonly label: string;
};
type Props<I> = {
  readonly items: Item<I>[];
  readonly removeItemLabel: string;
  readonly removeItem: (item: Item<I>) => void;
};

export function CustomList<I>({
  items,
  removeItem,
  removeItemLabel,
}: Props<I>) {
  if (items.length < 1) {
    return <></>;
  }
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <List
            sx={{
              maxWidth: 500,
              bgcolor: 'background.paper',
            }}
          >
            <ListItem>
              <ListItemText primary={<span>{item.label}</span>} />
              <CustomTextButton
                label={removeItemLabel}
                onClick={() => removeItem(item)}
              />
            </ListItem>
            <Divider sx={{ opacity: 0.6 }} />
          </List>
        </div>
      ))}
    </div>
  );
}
