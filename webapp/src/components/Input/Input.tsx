import css from './Input.module.scss';
import { type FormComponentProps } from '../../pages/FormPage/types';
import cn from 'classnames';

export const Input = ({ name, label, formik }: FormComponentProps) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const disabled = formik.isSubmitting;
  const invalid = !!touched && !!error;

  return (
    <div className={cn({ [css.wrapper]: true, [css.disabled]: disabled })}>
      <label htmlFor={name as string}>{label}</label>
      <br />
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name);
        }}
        value={value}
        id={name as string}
        name={name as string}
        disabled={disabled}
      />
      {invalid && <div className={cn(css.error)}>{error}</div>}
    </div>
  );
};
