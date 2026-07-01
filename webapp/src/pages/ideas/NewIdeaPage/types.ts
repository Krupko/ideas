import { type FormikProps } from 'formik';

export interface IdeaFormValues {
  name: string;
  nick: string;
  description: string;
  text: string;
  email: string;
}

export interface FormComponentProps<T> {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  type?: 'text' | 'password' | 'email' | 'tel';
  maxWidth?: number | string;
}
