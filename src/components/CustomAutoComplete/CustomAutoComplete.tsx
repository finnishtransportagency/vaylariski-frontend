import {
  Autocomplete,
  AutocompleteInputChangeReason,
  TextField,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { CustomText } from '../CustomText/CustomText.tsx';

type Props<T> = {
  readonly id: string;
  readonly title: string;
  readonly options: T[];
  readonly selected: T | undefined;
  readonly getLabel: (item?: T) => string;
  readonly setSelected: (item?: T) => void;
  readonly disabled?: boolean;
  readonly toolTip?: string;
};

export default function CustomAutoComplete<T>({
  id,
  title,
  options,
  selected,
  getLabel,
  setSelected,
  disabled = false,
  toolTip = undefined,
}: Props<T>) {
  const [inputValue, setInputValue] = useState<string>(getLabel(selected));
  return (
    <Form.Group>
      <CustomText label={title} style="medium" />
      <Tooltip placement="right" arrow title={toolTip} id={`${id}-tooltip`}>
        <Autocomplete
          disabled={disabled}
          id={id}
          disablePortal
          options={options}
          getOptionLabel={(option: T) => getLabel(option)}
          onChange={(event: any, newValue: T | null) =>
            setSelected(newValue ?? undefined)
          }
          value={selected ?? null}
          inputValue={inputValue}
          onInputChange={(
            event: any,
            newValue: string,
            reason: AutocompleteInputChangeReason
          ) => {
            if (reason === 'input') {
              setInputValue(newValue);
            }
          }}
          size="small"
          renderInput={(params) => (
            <TextField style={{ backgroundColor: 'white' }} {...params} />
          )}
          data-cy-id={`${id}-input`}
        />
      </Tooltip>
    </Form.Group>
  );
}
