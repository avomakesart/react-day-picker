import * as React from 'react';

import { isSameDay, isSameMonth } from 'date-fns';

import { useDayPicker, useModifiers, useSelection } from '../../hooks';
import { formatDay } from '../../hooks/useDayPicker/formatters';
import { useFocus } from '../../hooks/useFocus';
import { createHandlers } from './utils/createHandlers';

/** Represent the props used by the [[Day]] component. */
export interface DayProps {
  /** The month where the date is displayed. */
  displayMonth: Date;
  /** The date to render. */
  date: Date;
}

/**
 * Render the content of a date cell, as a button or span element according to
 * its modifiers. Attaches the event handlers from DayPicker context, and manage the
 * focused date.
 */
export function Day(props: DayProps): JSX.Element | null {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { date, displayMonth } = props;
  const context = useDayPicker();
  const selection = useSelection();
  const modifierStatus = useModifiers(date);
  const [
    focusedDay,
    { focusDayAfter, focusDayBefore, focusDayDown, focusDayUp, blur, focus }
  ] = useFocus();

  const {
    classNames,
    labels: { labelDay },
    components: { DayContent },
    locale,
    modifierClassNames,
    modifierPrefix,
    modifierStyles,
    showOutsideDays,
    styles,
    onDayClick,
    onDayFocus,
    onDayBlur,
    onDayKeyDown,
    mode
  } = context;

  React.useEffect(() => {
    if (!focusedDay) return;
    if (isSameDay(focusedDay, date)) {
      buttonRef.current?.focus();
    }
  }, [focusedDay]);

  if (modifierStatus.hidden) return <></>;

  const ariaLabel = labelDay(date, modifierStatus, { locale });
  const ariaPressed = modifierStatus.selected;

  // #region Event handlers
  const handleClick: React.MouseEventHandler = (e) => {
    if (mode !== 'uncontrolled') {
      selection[mode].onDayClick?.(date, modifierStatus, e);
    }
    onDayClick?.(date, modifierStatus, e);
  };

  const handleFocus: React.FocusEventHandler = (e) => {
    focus(date);
    onDayFocus?.(date, modifierStatus, e);
  };
  const handleBlur: React.FocusEventHandler = (e) => {
    blur();
    onDayBlur?.(date, modifierStatus, e);
  };
  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        e.stopPropagation();
        focusDayBefore();
        break;
      case 'ArrowRight':
        e.preventDefault();
        e.stopPropagation();
        focusDayAfter();
        break;
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        focusDayDown();
        break;
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        focusDayUp();
        break;
    }
    onDayKeyDown?.(date, modifierStatus, e);
  };

  const otherEventHandlers = createHandlers(date, modifierStatus, context);

  // #endregion
  // #region Create the class name for the button
  const cssClasses: (string | undefined)[] = [classNames.day];

  const isOutside = !isSameMonth(date, displayMonth);
  if (isOutside) {
    cssClasses.push(classNames.day_outside);
  }

  Object.keys(modifierStatus)
    .filter((modifier) => Boolean(modifierStatus[modifier]))
    .forEach((modifier) => {
      if (modifierClassNames[modifier]) {
        cssClasses.push(modifierClassNames[modifier]);
      } else {
        cssClasses.push(`${modifierPrefix}${modifier}`);
      }
    });

  //#endregion
  // #region Create the inline-styles
  let style = { ...styles.day };
  if (styles) {
    Object.keys(modifierStatus).forEach(
      (modifier) => (style = { ...style, ...styles[modifier] })
    );
  }
  if (modifierStyles) {
    Object.keys(modifierStatus).forEach(
      (modifier) => (style = { ...style, ...modifierStyles[modifier] })
    );
  }

  // #endregion

  const dayContent = (
    <DayContent
      aria-label={ariaLabel}
      hiddenClassName={classNames.hidden}
      date={date}
      modifiers={modifierStatus}
      showOutsideDays={showOutsideDays}
      outside={isOutside}
      format={formatDay}
      locale={locale}
      displayMonth={displayMonth}
    />
  );

  const isDisabled = modifierStatus.disabled || isOutside;
  const isFocused = focusedDay && !isSameDay(focusedDay, date);

  let tabIndex = 0;
  if (isDisabled || isFocused) tabIndex = -1;

  const className = [classNames.button_reset, ...cssClasses].join(' ');

  return (
    <button
      ref={buttonRef}
      aria-pressed={ariaPressed}
      style={style}
      disabled={isDisabled}
      className={className}
      tabIndex={tabIndex}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...otherEventHandlers}
    >
      {dayContent}
    </button>
  );
}
