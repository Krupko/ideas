import { useNavigate, useParams } from 'react-router-dom';
import { Segment } from '../../../components/Segment/Segment';
import { Alert } from '../../../components/Alert/Alert';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { Textarea } from '../../../components/Textarea/Textarea';
import { useForm } from '../../../lib/form';
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/ideas/updateIdea/input';
import { trpc } from '../../../lib/trpc';
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../../lib/routes';
import { withPageWrapper } from '../../../lib/pageWrapper';
import type { TrpcRouterOutput } from '@ideanick/backend/src/router/router';

type GetIdeaOutput = NonNullable<TrpcRouterOutput['getIdea']['idea']>;

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },

  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const queryData = queryResult?.data as { idea?: GetIdeaOutput } | undefined;
    const idea = checkExists(queryData?.idea, 'Идея не найдена');
    checkAccess(ctx.me?.id === idea.authorId, 'Редактировать идею может только автор');
    return {
      idea,
    };
  },
})(({ idea }) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: idea.name ?? '',
      nick: idea.nick ?? '',
      description: idea.description ?? '',
      text: idea.text ?? '',
      email: idea.email ?? '',
    },
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async ({ nick, ...restValues }) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, nick, ...restValues });
      navigate(getViewIdeaRoute({ ideaNick: nick }));
    },
    resetOnSuccess: true,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Редактировать идею: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="description" formik={formik} />
        <Textarea name="text" label="text" formik={formik} />

        <Alert {...alertProps} />
        <Button {...buttonProps}>Отправка формы</Button>
      </form>
    </Segment>
  );
});
