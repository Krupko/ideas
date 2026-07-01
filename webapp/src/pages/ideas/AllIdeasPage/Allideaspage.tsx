import './Allideaspage.scss';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Segment } from '../../../components/Segment/Segment';
import { Alert } from '../../../components/Alert/Alert';
import { Input } from '../../../components/Input/Input';
import { layoutContentElRef } from '../../../components/Layout/Layout';
import { Loader } from '../../../components/Loader/Loader';
import { useForm } from '../../../lib/form';
import { zGetIdeasTrpcInput } from '@ideanick/backend/src/router/ideas/getIdeas/input';

export const AllIdeasPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(formik.values.search ?? '');
    }, 500);
    return () => clearTimeout(timer);
  }, [formik.values.search]);
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
      search,
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    }
  );

  return (
    <Segment title="Просто вывод списка">
      <div>
        <Input maxWidth="100%" label="search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data?.pages[0]?.ideas.length ? (
        <Alert color="brown">Ничего не найдено</Alert>
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
