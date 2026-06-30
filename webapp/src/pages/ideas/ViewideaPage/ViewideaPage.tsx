import './ViewIdeaPage.scss';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../../components/Button/Button';
import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import { Segment } from '../../../components/Segment/Segment';
import { format } from 'date-fns';
import { withPageWrapper } from '../../../lib/pageWrapper';
import type { TrpcRouterOutput } from '@ideanick/backend/src/router/router';

type GetIdeaOutput = NonNullable<TrpcRouterOutput['getIdea']['idea']>;

const LikeButton = ({ idea }: { idea: GetIdeaOutput }) => {
  const trpcUtils = trpc.useUtils();
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick }) as
        | { idea?: GetIdeaOutput }
        | undefined;
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData);
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick });
    },
  });

  return (
    <button
      onClick={() => {
        void setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe });
      }}
    >
      {idea.isLikedByMe ? 'Диз-лайк' : 'Лайк'}
    </button>
  );
};

export const ViewideaPage = withPageWrapper<{
  idea: GetIdeaOutput;
  me: { id: string; nick: string; name: string } | null;
}>({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },

  setProps: ({ queryResult, checkExists, ctx }) => {
    const queryData = queryResult?.data as { idea?: GetIdeaOutput } | undefined;
    if (!queryData?.idea) {
      throw new Error('Идея не найдена');
    }
    return {
      idea: checkExists(queryData.idea, 'ИДЕЯ НЕ НАЙДЕНА'),
      me: ctx.me,
    };
  },
  // showLoaderOnFetching: false,
})(({ idea, me }) => (
  <Segment title="* 2 страница *" description={idea.name}>
    {/* <p>{data.idea.nick}</p> */}
    <div>
      <p className="title-view2">Дата поста: {format(idea.createdAt, 'dd-MM-yyyy')}</p>
      <p className="author-name">
        Автор: {idea.author.nick}
        {idea.author.name ? ` (${idea.author.name})` : ''}
      </p>
      <p className="text-view">{idea.email}</p>
      <p>Описание идеи</p>
      <p dangerouslySetInnerHTML={{ __html: idea.text }} />

      <div>
        Likes: {idea.likesCount}
        {me && (
          <>
            <LikeButton idea={idea} />
          </>
        )}
      </div>
    </div>

    {me?.id === idea.authorId && (
      <div>
        <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>РЕДАКТИРОВАТЬ ИДЕЮ</LinkButton>
      </div>
    )}
  </Segment>
));
