import { type FormComponentProps } from '../../pages/FormPage/types';

import './Textarea.scss';

export const Textarea = ({ name, label, formik }: FormComponentProps) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name as string}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        value={value}
        name={name as string}
        id={name as string}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
