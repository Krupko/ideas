import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Segment } from '../../components/Segment/Segment';
import { trpc } from '../../lib/trpc';
import { getAllIdeasRoute } from '../../lib/routes';
import { useForm } from '../../lib/form';
import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signUp.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },

    validationSchema: zSignUpTrpcInput
      .extend({ passwordAgain: z.string().min(1) })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: 'custom',
            message: 'Пароли должны быть одинаковы',
            path: ['passwordAgain'],
          });
        }
      }),

    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      void trpcUtils.invalidate();
      navigate(getAllIdeasRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Зарегистрироваться">
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />
        <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Зарегистрироваться</Button>
      </form>
    </Segment>
  );
};
