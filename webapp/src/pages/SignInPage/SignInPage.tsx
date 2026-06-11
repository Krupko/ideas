import { zSignTrpcInput } from '../../Validation/sign';
import Cookies from 'js-cookie';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Segment } from '../../components/Segment/Segment';
import { trpc } from '../../lib/trpc';
import { useForm } from '../../lib/form';
import { withPageWrapper } from '../../lib/pageWrapper';

export const SignInPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const trpcUtils = trpc.useUtils();
  const signIn = trpc.signIn.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      void trpcUtils.invalidate();
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="СТРАНИЦА ВХОДА">
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Password" name="password" type="password" formik={formik} />

        <Alert {...alertProps} />
        <Button {...buttonProps}>ВОЙТИ</Button>
      </form>
    </Segment>
  );
});
