import { ModifierStatus } from '../../types';
import { useDayPickerContext } from '../useDayPickerContext';
import { useSelection } from '../useSelection';
import { getModifierStatus } from './utils/getModifierStatus';

export function useModifiers(date: Date): ModifierStatus {
  const context = useDayPickerContext();
  const selection = useSelection();
  const modifiers = Object.assign({}, context.modifiers);

  if (!('selected' in context)) {
    const { single, multiple, range } = selection ?? {};
    switch (context.mode) {
      case 'range':
        if (!range.selected) break;
        modifiers.selected = range.selected;
        modifiers['range-middle'] = {
          after: range.selected.from,
          before: range.selected.to
        };
        modifiers['range-start'] = range.selected.from;
        if (range.selected.to) modifiers['range-end'] = range.selected.to;
        break;
      case 'multiple':
        if (!multiple.selected) break;
        modifiers.selected = multiple.selected;
        break;
      default:
      case 'single':
        if (!single.selected) break;
        modifiers.selected = single.selected;
        break;
    }
  }

  const status = getModifierStatus(date, modifiers);
  return status;
}
