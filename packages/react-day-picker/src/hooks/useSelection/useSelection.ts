import React from 'react';

import { SelectionContext, SelectionContextValue } from './SelectionContext';

export function useSelection(): SelectionContextValue {
  const context = React.useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
