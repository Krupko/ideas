import { useNavigate, useParams } from 'react-router-dom';
import pick from 'lodash/pick';
import { Segment } from '../../components/Segment/Segment';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import type { TrpcRouterOutput } from '@ideanick/backend/src/router/router';
import { useForm } from '../../lib/form';
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input';
import { trpc } from '../../lib/trpc';
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes';

const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      ...pick(idea, ['name', 'nick', 'description', 'text']),
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
};

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });

  const getMeResult = trpc.getMe.useQuery();

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Загрузка........</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error:{getIdeaResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Идея не найдена</span>;
  }

  const idea = getIdeaResult.data?.idea;
  const me = getMeResult.data?.me;

  if (!me) {
    return <span>Только для авторизованных</span>;
  }

  if (me.id !== idea.authorId) {
    return <span>Редактировать идею может только автор</span>;
  }

  return <EditIdeaComponent idea={idea} />;
};
