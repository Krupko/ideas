import { type FormComponentProps } from '../../pages/ideas/NewIdeaPage/types';
import { type IdeaFormValues } from '../../pages/ideas/NewIdeaPage/types';

import './Textarea.scss';

export const Textarea = ({ name, label, formik }: FormComponentProps<IdeaFormValues>) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor={name as string}>{label}</label>
      <br />
      <textarea
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name);
        }}
        value={value}
        name={name as string}
        id={name as string}
        disabled={formik.isSubmitting}
      />
      {!!touched && !!error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
