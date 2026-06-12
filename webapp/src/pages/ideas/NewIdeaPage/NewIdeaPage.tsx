import './NewIdeaPage.scss';
import { Segment } from '../../../components/Segment/Segment';
import { Input } from '../../../components/Input/Input';
import { Textarea } from '../../../components/Textarea/Textarea';
import { zCreateIdeaTrpcInput } from '../../../.../../../../backend/src/router/ideas/createIdea/input';
import { trpc } from '../../../lib/trpc';
import { Alert } from '../../../components/Alert/Alert';
import { Button } from '../../../components/Button/Button';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
      email: '',
    },
    validationSchema: zCreateIdeaTrpcInput,

    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      formik.resetForm();
    },
    successMessage: 'Идея добавлена',
    showValidationAlert: true,
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

        <Alert {...alertProps} />
        <Button {...buttonProps}>Отправка формы</Button>
      </form>
    </Segment>
  );
});
