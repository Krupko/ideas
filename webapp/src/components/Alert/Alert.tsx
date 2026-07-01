import cn from 'classnames';
import css from './Alert.module.scss';
import React from 'react';

export type AlertProps = {
  color: 'red' | 'green' | 'brown';
  hidden?: boolean;
  children: React.ReactNode;
};
export const Alert = ({ color, hidden, children }: AlertProps) => {
  if (hidden) {
    return null;
  }
  return <div className={cn({ [css.alert]: true, [css[color]]: true })}>{children}</div>;
};
