import './FormPage';
import { Segment } from '../../components/Segment/Segment';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { useFormik } from 'formik';
import { type IdeaFormValues } from './types';
import { zCreateIdeaTrpcInput } from '../../.../../../../backend/src/router/createIdea/input';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { trpc } from '../../lib/trpc';
import { useState } from 'react';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';

export function FormPage() {
  const [successMessageVisible, setSucessMeessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createIdea = trpc.createIdea.useMutation();
  const formik = useFormik<IdeaFormValues>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
      email: '',
    },
    validationSchema: toFormikValidationSchema(zCreateIdeaTrpcInput),

    onSubmit: async (values: IdeaFormValues) => {
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
        <Input name="email" label="email" formik={formik} />
        <Textarea name="text" label="text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Заполнено неправильно</div>
        )}

        {!!submittingError && <Alert color="red">{submittingError}</Alert>}

        {successMessageVisible && <Alert color="green">Идея добавлена успешно!</Alert>}

        <Button loading={formik.isSubmitting}>Отправка формы</Button>
      </form>
    </Segment>
  );
}
