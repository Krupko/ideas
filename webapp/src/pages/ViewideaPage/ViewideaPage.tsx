import './ViewIdeaPage.scss';
import { useParams } from 'react-router-dom';
import { type ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

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
    <div>
      <h1 className="title-view">* 2 страница *</h1>
      <h2 className="tile-view2">{data.idea.name}</h2>
      <p>{data.idea.nick}</p>
      <div>
        <p className="text-view">{data.idea.email}</p>
        <p>Описание идеи</p>
        <p dangerouslySetInnerHTML={{ __html: data.idea.text }} />
      </div>
    </div>
  );
};
