import css from './Input.module.scss';
import { type FormComponentProps } from '../../pages/ideas/NewIdeaPage/types';
import { type FormikValues } from 'formik';
import cn from 'classnames';

export const Input = <T extends FormikValues>({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: FormComponentProps<T>) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const disabled = formik.isSubmitting;
  const invalid = !!touched && !!error;

  return (
    <div
      className={cn({ [css.wrapper]: true, [css.disabled]: disabled })}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <label htmlFor={name as string}>{label}</label>
      <br />
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name as string, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name as string);
        }}
        value={(value as unknown as string | number) ?? ''}
        id={name as string}
        name={name as string}
        disabled={disabled}
      />
      {invalid && <div className={cn(css.error)}>{error}</div>}
    </div>
  );
};
