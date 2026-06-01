import './ViewIdeaPage.scss';
import { useParams } from 'react-router-dom';
import { LinkButton } from '../../components/Button/Button';
import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { Segment } from '../../components/Segment/Segment';
import { format } from 'date-fns/format';

export const ViewideaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });

  const getMeResult = trpc.getMe.useQuery();

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isLoading
  ) {
    return <span>Loading.....</span>;
  }

  if (getMeResult.isError) {
    return <span>Error:{getMeResult.error.message}</span>;
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Idea not found.......</span>;
  }

  const idea = getIdeaResult.data?.idea;
  const me = getMeResult.data?.me;

  return (
    <Segment title="* 2 страница *" description={idea.name}>
      {/* <p>{data.idea.nick}</p> */}
      <div>
        <p className="title-view2">Дата поста: {format(idea.createdAt, 'dd-MM-yyyy')}</p>
        <p className="author-name">Автор: {idea.author.nick}</p>
        <p className="text-view">{idea.email}</p>
        <p>Описание идеи</p>
        <p dangerouslySetInnerHTML={{ __html: idea.text }} />
      </div>

      {me?.id === idea.authorId && (
        <div>
          <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>РЕДАКТИРОВАТЬ ИДЕЮ</LinkButton>
        </div>
      )}
    </Segment>
  );
};
