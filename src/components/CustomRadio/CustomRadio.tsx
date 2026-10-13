import { Radio, RadioGroup, FormControlLabel, Tooltip } from '@mui/material';
import ConditionalWrapper from '../ConditionalWrapper/ConditionalWrapper.js';

import { ReactNode, useState } from 'react';
import { CustomText } from '../CustomText/CustomText.tsx';

type Props = {
  readonly id: string;
  readonly defaultValue: string | number;
  readonly buttonPropsArr: {
    readonly value: string | number;
    readonly label: string;
    readonly labelHelperText?: string;
    readonly disabled: boolean;
    readonly tooltip?: string;
  }[];
};

export default function CustomRadio({
  id,
  defaultValue,
  buttonPropsArr,
}: Props) {
  const [value, setValue] = useState<string>('');

  return (
    <>
      <RadioGroup
        row
        aria-labelledby={`${id}-group-label`}
        name={id}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
        }}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {buttonPropsArr.map((p) => {
          return (
            <ConditionalWrapper
              condition={p.disabled}
              wrapper={(children: ReactNode) => (
                <Tooltip placement="right" arrow title={p.tooltip}>
                  <>{children}</>
                </Tooltip>
              )}
              key={`${id}.${p.value}`}
            >
              <FormControlLabel
                value={p.value}
                disabled={p.disabled}
                control={<Radio />}
                label={
                  <span style={{ fontSize: 14 }}>
                    {p.label}
                    {p.labelHelperText ? (
                      <>
                        <br />
                        <CustomText label={p.labelHelperText} style="medium" />
                      </>
                    ) : null}
                  </span>
                }
              />
            </ConditionalWrapper>
          );
        })}
      </RadioGroup>
    </>
  );
}
