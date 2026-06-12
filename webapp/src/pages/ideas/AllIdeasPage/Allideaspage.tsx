import './Allideaspage.scss';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import { Link } from 'react-router-dom';

import { Segment } from '../../../components/Segment/Segment';

export const AllIdeasPage = () => {
  const { data, error, isLoading, isError } = trpc.getIdeas.useQuery();

  if (isLoading) {
    return <span>Loading.....</span>;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  return (
    <Segment title="Просто вывод списка">
      {data?.ideas?.map((idea) => (
        <Segment
          key={idea.nick}
          size={2}
          title={
            <Link className="link-list" to={getViewIdeaRoute({ ideaNick: idea.nick })}>
              {idea.name}
            </Link>
          }
          description={idea.description}
        ></Segment>
      ))}
    </Segment>
  );
};
