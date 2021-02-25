import * as React from 'react';

import { useDayPickerContext } from '../useDayPickerContext';
import { useMultipleSelect, UseMultipleSelect } from './useSelectMultiple';
import { useRangeSelect, UseRangeSelect } from './useSelectRange';
import { useSingleSelect, UseSingleSelect } from './useSingleSelect';

export type SelectionContextValue = {
  single: UseSingleSelect;
  multiple: UseMultipleSelect;
  range: UseRangeSelect;
};

export const SelectionContext = React.createContext<
  SelectionContextValue | undefined
>(undefined);

type SelectionProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides the setters and values for the three controlled selection modes.
 */
export const SelectionProvider = (
  props: SelectionProviderProps
): JSX.Element => {
  const dayPickerProps = useDayPickerContext();

  // Single select
  const single = useSingleSelect(
    'single',
    dayPickerProps.defaultSelected,
    dayPickerProps.required,
    dayPickerProps.onSelect
  );

  // Multiple select
  const multiple = useMultipleSelect(
    'multiple',
    dayPickerProps.defaultSelected,
    dayPickerProps.required,
    dayPickerProps.onSelectMultiple
  );

  const range = useRangeSelect(
    'range',
    dayPickerProps.defaultSelected,
    dayPickerProps.required,
    dayPickerProps.onSelectRange
  );

  return (
    <SelectionContext.Provider value={{ single, multiple, range }}>
      {props.children}
    </SelectionContext.Provider>
  );
};
