import './Allideaspage.scss';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { Segment } from '../../../components/Segment/Segment';
import { Alert } from '../../../components/Alert/Alert';
import { layoutContentElRef } from '../../../components/Layout/Layout';
import { Loader } from '../../../components/Loader/Loader';

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
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <InfiniteScroll
          threshold={250}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) {
              void fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
          loader={
            <div key="losder">
              <Loader type="section" />
            </div>
          }
          getScrollParent={() => layoutContentElRef.current}
          useWindow={
            (layoutContentElRef.current &&
              getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'
          }
        >
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
                >
                  Likes: {idea.likesCount}
                </Segment>
              </div>
            ))}
        </InfiniteScroll>
      )}
    </Segment>
  );
};
