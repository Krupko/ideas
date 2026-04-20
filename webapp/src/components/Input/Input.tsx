import './Input.scss';
import { type FormComponentProps } from '../../pages/FormPage/types';

export const Input = ({ name, label, formik }: FormComponentProps) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div className="input-wrapper">
      <label htmlFor={name as string}>{label}</label>
      <br />
      <input
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
      />
      {!!touched && !!error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
