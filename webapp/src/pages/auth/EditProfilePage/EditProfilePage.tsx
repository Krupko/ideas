import type { TrpcRouterOutput } from '@ideanick/backend/src/router/router';
import { zUpdateProfileTrpcInput } from '@ideanick/backend/src/router/auth/updateProfile/input';
import { Segment } from '../../../components/Segment/Segment';
import { Alert } from '../../../components/Alert/Alert';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { trpc } from '../../../lib/trpc';
import { pick } from 'lodash';
import { zUpdatePasswordTrpcInput } from '@ideanick/backend/src/router/auth/updatePassword/input';
import { z } from 'zod';

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(me, ['name', 'nick']),
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updatedMe });
    },
    successMessage: 'ПРОФИЛЬ ОБНОВЛЕН',
    resetOnSuccess: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input label="Nick" name="nick" formik={formik} />
      <Input label="Name" name="name" formik={formik} />
      <Alert {...alertProps} />
      <Button {...buttonProps}>ОБНОВИТЬ ПРОФИЛЬ</Button>
    </form>
  );
};

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: 'custom',
            message: 'ПАРОЛИ ДОЛЖНЫ БЫТЬ ОДИНАКОВЫ',
            path: ['еще раз новый пароль'],
          });
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword });
    },
    successMessage: 'ПАРОЛЬ ОБНОВЛЕН',
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Input label="Old Password" name="oldPassword" type="password" formik={formik} />
      <Input label="New password" name="newPassword" type="password" formik={formik} />
      <Input label="New password again" name="newPasswordAgain" type="password" formik={formik} />
      <Alert {...alertProps} />
      <Button {...buttonProps}>ОБНОВИТЬ ПАРОЛЬ</Button>
    </form>
  );
};

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <Segment title="РЕДАКТИРОВАТЬ ПРОФИЛЬ">
      <Segment title="General" size={2}>
        <General me={me} />
      </Segment>

      <Segment title="Password" size={2}>
        <Password />
      </Segment>
    </Segment>
  );
});
