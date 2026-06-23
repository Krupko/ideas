import { zUpdateProfileTrpcInput } from '@ideanick/backend/src/router/auth/updateProfile/input';
import { Segment } from '../../../components/Segment/Segment';
import { Alert } from '../../../components/Alert/Alert';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { trpc } from '../../../lib/trpc';
import { pick } from 'lodash';

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx }) => ({
    me: ctx.me!,
  }),
})(({ me }) => {
  const trpcUtils = trpc.useContext();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(me, ['name', 'nick']),
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updatedMe });
    },
    successMessage: 'ПРОФЕЛЬ ОБНОВЛЕН',
    resetOnSuccess: false,
  });

  return (
    <Segment title="РУДАКТИРОВАТЬ ПРОФИЛЬ">
      <form onSubmit={formik.handleSubmit}>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Name" name="name" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>ОБНОВИТЬ ПРОФNЛЬ</Button>
      </form>
    </Segment>
  );
});
