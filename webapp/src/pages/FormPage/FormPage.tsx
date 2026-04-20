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
    validate: (values) => {
      const error: Partial<typeof values> = {};
      if (!values.name) {
        error.name = 'Напишите имя';
      }
      if (!values.nick) {
        error.nick = 'Нужен ник';
      } else if (!values.nick.match(/^[a-z0-9-]+$/)) {
        error.nick = 'Соблюдай правильность написания';
      }
      if (!values.description) {
        error.description = 'Нужно описание';
      }
      if (!values.text) {
        error.text = 'Нужен текст';
      } else if (values.text.length < 7) {
        error.text = 'Тексе не менее 7';
      }

      return error;
    },
    onSubmit: (values: FormValues) => {
      console.info('Submitted', values);
    },
  });
  console.log(formik);
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
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Заполнено неправильно</div>
        )}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  );
}
