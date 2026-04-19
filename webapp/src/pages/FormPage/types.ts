import { type FormikProps } from 'formik';

export interface FormValues {
  name: string;
  nick: string;
  description: string;
  text: string;
}

export interface FormComponentProps {
  name: keyof FormValues;
  label: string;
  formik: FormikProps<FormValues>;
}
