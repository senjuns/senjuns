import _ from 'lodash';
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from 'react';

import { Button, Grid, ColorInput, TextInput } from '../../components/common';
import { HeatMapStylings } from '../../shared/interfaces/heatmap';

type TInputItem = {
  label: string;
  key: string;
};

interface HeatMapStylingToolProps {
  /**
   * The heatmap styling value.
   */
  value: HeatMapStylings;
  /**
   * Callback to be called when the heatmap styling value changed.
   */
  onChange: (value: HeatMapStylings) => void;
}

const HeatMapStylingTool: FC<HeatMapStylingToolProps> = ({
  value: defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onChange(value);
  };

  const colorInputList: TInputItem[] = [
    {
      label: 'Low',
      key: 'low.color',
    },
    {
      label: 'Medium Low',
      key: 'mediumLow.color',
    },
    {
      label: 'Medium',
      key: 'medium.color',
    },
    {
      label: 'Medium High',
      key: 'mediumHigh.color',
    },
    {
      label: 'High',
      key: 'high.color',
    },
  ];

  const valueInputList: TInputItem[] = [
    {
      label: 'Out of range: Min',
      key: 'low.max',
    },
    {
      label: 'Optimal: Min',
      key: 'mediumLow.max',
    },
    {
      label: 'Optimal: Max',
      key: 'medium.max',
    },
    {
      label: 'Out of range: Max',
      key: 'mediumHigh.max',
    },
  ];

  const handleChangeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    input: TInputItem
  ) => {
    setValue(_.cloneDeep(_.set(value, input.key, event.target.value)));
  };

  const handleChangeColor = (color: string, input: TInputItem) => {
    setValue(_.cloneDeep(_.set(value, input.key, color)));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          Colors
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            {colorInputList.map((input) => (
              <Grid key={input.key} item md={2} xs={4}>
                <ColorInput
                  label={input.label}
                  value={_.get(value, input.key)}
                  onChange={(color: string) => handleChangeColor(color, input)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Values
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            {valueInputList.map((input) => (
              <Grid key={input.key} item md={2} xs={4}>
                <TextInput
                  label={input.label}
                  value={_.get(value, input.key)}
                  onChange={(event) => handleChangeValue(event, input)}
                />
              </Grid>
            ))}

            <Grid item md={2} xs={4}>
              <Button type="submit">Apply</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default HeatMapStylingTool;
