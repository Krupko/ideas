import { useFormik, type FormikConfig } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { z } from 'zod';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Segment } from '../../components/Segment/Segment';
import { trpc, zSignUpTrpcInput } from '../../lib/trpc';

interface SignUpValues {
  nick: string;
  password: string;
  passwordAgain: string;
}

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signUp = trpc.signUp.useMutation();
  const formik = useFormik<SignUpValues>({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: 'custom',
              message: 'Пароли должны совпадать!',
              path: ['passwordAgain'],
            });
          }
        })
    ) as unknown as FormikConfig<SignUpValues>['validate'],

    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await signUp.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Произошла ошибка';
        setSubmittingError(message);
      }
    },
  });

  return (
    <Segment title="Зарегистрироваться">
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />
        <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red">Некоторые поля заполнены неправильно</Alert>
        )}
        {submittingError && <Alert color="red">{submittingError}</Alert>}
        {successMessageVisible && <Alert color="green">Спасибо за регистрацию</Alert>}
        <Button loading={formik.isSubmitting}>Зарегистрироваться</Button>
      </form>
    </Segment>
  );
};
