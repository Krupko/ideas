import cn from 'classnames';
import css from './Alert.module.scss';
import React from 'react';

export const Alert = ({
  color,
  children,
}: {
  color: 'red' | 'green';
  children: React.ReactNode;
}) => {
  return <div className={cn({ [css.alert]: true, [css[color]]: true })}>{children}</div>;
};
