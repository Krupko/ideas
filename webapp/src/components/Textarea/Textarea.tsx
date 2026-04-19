import { type FormComponentProps } from '../../pages/FormPage/types';

import './Textaria.scss';

export const Textarea = ({ name, label, formik }: FormComponentProps) => {
  const value = formik.values[name];

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
    </div>
  );
};
