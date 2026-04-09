import css from './Segment.module.scss';
import React from 'react';

export const Segment = ({
  title,
  size = 1,
  description,
  children,
}: {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className={css.segment}>
      {size === 1 ? <h1 className={css.title}>{title}</h1> : <h2 className={css.title}>{title}</h2>}
      {description && <p className={css.description}>{description}</p>}
      {children && <div className={css.content}>{children}</div>}
    </section>
  );
};
