import './Input.scss';
import { type FormComponentProps } from '../../pages/FormPage/types';

export const Input = ({ name, label, formik }: FormComponentProps) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;

  return (
    <div className="input-wrapper">
      <label htmlFor={name as string}>{label}</label>
      <br />
      <input
        type="text"
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        value={value}
        id={name as string}
        name={name as string}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
