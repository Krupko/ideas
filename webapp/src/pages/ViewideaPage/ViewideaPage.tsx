import './ViewIdeaPage.scss';
import { useParams } from 'react-router-dom';
import { type ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import { Segment } from '../../components/Segment/Segment';

export const ViewideaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const { data, error, isLoading, isError } = trpc.getIdea.useQuery({
    ideaNick,
  });

  if (isLoading) {
    return <span>Loading.....</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  if (!data?.idea) {
    return <span>Idea not found.......</span>;
  }

  return (
    <Segment title="* 2 страница *" description={data.idea.name}>
      <p>{data.idea.nick}</p>
      <div>
        <p className="text-view">{data.idea.email}</p>
        <p>Описание идеи</p>
        <p dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      </div>
    </Segment>
  );
};
