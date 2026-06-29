import './Allideaspage.scss';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import { Link } from 'react-router-dom';

import { Segment } from '../../../components/Segment/Segment';
import { Alert } from '../../../components/Alert/Alert';

export const AllIdeasPage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getIdeas.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <Segment title="Просто вывод списка">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div>
          <div>
            {data?.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
                <div key={idea.nick}>
                  <Segment
                    size={2}
                    title={
                      <Link className="link-list" to={getViewIdeaRoute({ ideaNick: idea.nick })}>
                        {idea.name}
                      </Link>
                    }
                    description={idea.description}
                  />
                </div>
              ))}
          </div>
          <div>
            {hasNextPage && !isFetchingNextPage && (
              <button className="button-loading" onClick={() => void fetchNextPage()}>
                ЗАГРУЗИТЬ ЕЩЕ
              </button>
            )}
            {isFetchingNextPage && <span>Загрузка...</span>}
          </div>
        </div>
      )}
    </Segment>
  );
};
