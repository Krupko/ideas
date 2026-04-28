import './FormPage';
import { Segment } from '../../components/Segment/Segment';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { useFormik } from 'formik';
import { type FormValues } from './types';
import { zCreateIdeaTrpcInput } from '../../.../../../../backend/src/router/createIdea/input'; // eslint-disable-line @typescript-eslint/no-restricted-imports
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../../lib/trpc';
import { useState } from 'react';

export function FormPage() {
  const [successMessageVisible, setSucessMeessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createIdea = trpc.createIdea.useMutation();
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: toFormikValidationSchema(zCreateIdeaTrpcInput),

    onSubmit: async (values: FormValues) => {
      try {
        await createIdea.mutateAsync(values);

        formik.resetForm(); //Сброс значений
        setSucessMeessageVisible(true);
        setTimeout(() => {
          setSucessMeessageVisible(false);
        }, 3000);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
        setSubmittingError(errorMessage);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
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
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Заполнено неправильно</div>
        )}

        {!!submittingError && <div style={{ color: 'red' }}>{submittingError}</div>}

        {successMessageVisible && <div style={{ color: 'green' }}>Запись добавлена</div>}

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Отправляется...' : 'Отправка формы'}
        </button>
      </form>
    </Segment>
  );
}
