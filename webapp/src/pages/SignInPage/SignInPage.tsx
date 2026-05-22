import { zSignTrpcInput } from '../../Validation/sign';
import { useFormik, type FormikConfig } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Segment } from '../../components/Segment/Segment';
import { trpc } from '../../lib/trpc';
import { getAllIdeasRoute } from '../../lib/routes';

interface SignInValues {
  nick: string;
  password: string;
}

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signIn = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignTrpcInput) as unknown as FormikConfig<SignInValues>['validate'],
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);

        const { token } = await signIn.mutateAsync(values);
        Cookies.set('token', token, { expires: 9999 });
        void trpcUtils.invalidate();
        navigate(getAllIdeasRoute());
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSubmittingError(err.message);
        } else {
          setSubmittingError('Произошла ошибка');
        }
      }
    },
  });

  return (
    <Segment title="СТРАНИЦА ВХОДА">
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />
        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red">Неправильно заполненые поля</Alert>
        )}
        {submittingError && <Alert color="red">{submittingError}</Alert>}
        <Button loading={formik.isSubmitting}>ВОЙТИ</Button>
      </form>
    </Segment>
  );
};
