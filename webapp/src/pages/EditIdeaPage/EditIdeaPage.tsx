import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import pick from 'lodash/pick';
import { Segment } from '../../components/Segment/Segment';
import { Alert } from '../../components/Alert/Alert';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import { type EditIdeaRouteParams, getViewIdeaRoute } from '../../lib/routes';
import type { TrpcRouterOutput } from '@ideanick/backend/src/router/router';
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input';
import { trpc } from '../../lib/trpc';

interface EditIdeaFormValues {
  name: string;
  nick: string;
  description: string;
  text: string;
  email: string;
}

const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const navigate = useNavigate();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const updateIdea = trpc.updateIdea.useMutation();
  const formik = useFormik<EditIdeaFormValues>({
    initialValues: {
      ...pick(idea, ['name', 'nick', 'description', 'text']),
      email: idea.email ?? '',
    },
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })) as unknown as (
      // eslint-disable-next-line no-unused-vars
      values: EditIdeaFormValues
    ) => Partial<Record<keyof EditIdeaFormValues, string>>,
    onSubmit: async ({ nick, ...restValues }) => {
      try {
        setSubmittingError(null);
        await updateIdea.mutateAsync({ ideaId: idea.id, nick, ...restValues });
        navigate(getViewIdeaRoute({ ideaNick: nick }));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Произошла ошибка';
        setSubmittingError(message);
      }
    },
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="description" formik={formik} />
        <Textarea name="text" label="text" formik={formik} />

        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>Заполнено неправильно</div>
        )}
        {!!submittingError && <Alert color="red">{submittingError}</Alert>}

        <Button loading={formik.isSubmitting}>Отправка формы</Button>
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
