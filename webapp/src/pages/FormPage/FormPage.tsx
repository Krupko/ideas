import './FormPage';
import { Segment } from '../../components/Segment/Segment';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { useFormik } from 'formik';
import { type FormValues } from './types';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

export function FormPage() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z
          .string()
          .or(z.undefined())
          .transform((val) => val ?? '')
          .refine((val) => val.length >= 3, 'Не менее 3 символов'),
        nick: z
          .string()
          .or(z.undefined())
          .transform((val) => val ?? '')
          .refine((val) => val.length >= 3, 'Не менее 3 символов')
          .refine((val) => /^[a-z0-9-]+$/.test(val), 'Только строчные буквы, цифры и дефис'),
        description: z
          .string()
          .or(z.undefined())
          .transform((val) => val ?? '')
          .refine((val) => val.length >= 3, 'Описание обязательно'),
        text: z
          .string()
          .or(z.undefined())
          .transform((val) => val ?? '')
          .refine((val) => val.length >= 7, 'Не менее 7 символов'),
      })
    ),

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
