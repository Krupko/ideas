import './FormPage';
import { Segment } from '../../components/Segment/Segment';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { useFormik } from 'formik';
import { type FormValues } from './types';

export function FormPage() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    onSubmit: (values: FormValues) => {
      console.info('Submitted', values);
    },
  });

  return (
    <Segment title="СТРАНИЦА ФОРМЫ" size={2} description="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="description" formik={formik} />
        <Textarea name="text" label="text" formik={formik} />
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
}
