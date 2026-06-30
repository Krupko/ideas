import { type UseTRPCQueryResult } from '@trpc/react-query/shared';
import { useNavigate } from 'react-router-dom';
import { useAppContext, type AppContext } from './ctx';
import React, { useEffect } from 'react';
import { ErrorPageComponent } from '../components/ErrorPageComponent/ErrorPageComponent';
import { getAllIdeasRoute } from './routes';
import { NotFoundPage } from '../pages/other/NotFoundPage/NotFoundPage';
import { Loader } from '../components/Loader/Loader';

class CheckExistsError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

const checkExistsFn = <T,>(value: T, message?: string): NonNullable<T> => {
  if (!value) {
    const errorMessage = message ?? 'Значение не найдено';
    throw new CheckExistsError(errorMessage);
  }
  return value;
};

class CheckAccessError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

const checkAccessFn = <T,>(value: T, message?: string): void => {
  if (!value) {
    const errorMessage = message ?? 'Доступ запрещен';
    throw new CheckAccessError(errorMessage);
  }
};

class GetAuthorizedMeError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

type Props = Record<string, unknown>;
type QueryResult = UseTRPCQueryResult<unknown, unknown>;
type HelperProps = {
  ctx: AppContext;
  queryResult: QueryResult | undefined;
};

type SetPropsProps = {
  ctx: AppContext;
  queryResult: QueryResult | undefined;
  checkExists: typeof checkExistsFn;
  checkAccess: typeof checkAccessFn;
  // eslint-disable-next-line no-unused-vars
  getAuthorizedMe: (message?: string) => NonNullable<AppContext['me']>;
};

type PageWrapperProps<TProps extends Props> = {
  redirectAuthorized?: boolean;

  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccessTitle?: string;
  checkAccessMessage?: string;

  // eslint-disable-next-line no-unused-vars
  checkExists?: (helperProps: HelperProps) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => QueryResult;
  // eslint-disable-next-line no-unused-vars
  setProps?: (setPropsProps: SetPropsProps) => TProps;
  Page: React.FC<TProps>;
};

const PageWrapper = <TProps extends Props>({
  authorizedOnly,
  authorizedOnlyTitle = 'Пожалуйста авторизуйтесь!',
  authorizedOnlyMessage = 'Эта страница доступна только авторизованым',
  redirectAuthorized,
  checkAccessTitle = 'Доступ запрещен!',
  checkAccessMessage = 'У вас нет доступа к этой странице',
  checkExists,
  checkExistsTitle = 'Объект не найден',
  checkExistsMessage = 'Запрошенный Объект не найден',
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps>) => {
  const navigate = useNavigate();
  const ctx = useAppContext();
  const queryResult = useQuery?.();

  const redirectNeeded = redirectAuthorized && ctx.me;

  useEffect(() => {
    if (redirectNeeded) {
      navigate(getAllIdeasRoute(), { replace: true });
    }
  }, [redirectNeeded, navigate]);

  if (queryResult?.isLoading || redirectNeeded) {
    return <Loader type="page" />;
  }

  if (queryResult?.isError) {
    const errorMessage =
      queryResult.error instanceof Error ? queryResult.error.message : 'Произошла ошибка';
    return <ErrorPageComponent message={errorMessage} />;
  }

  if (authorizedOnly && !ctx.me) {
    return <ErrorPageComponent title={authorizedOnlyTitle} message={authorizedOnlyMessage} />;
  }

  const helperProps: HelperProps = {
    ctx,
    queryResult: useQuery ? queryResult : undefined,
  };

  if (checkExists) {
    const notExists = !checkExists(helperProps);
    if (notExists) {
      return <NotFoundPage title={checkExistsTitle} message={checkExistsMessage} />;
    }
  }

  try {
    const props = setProps?.({
      ...helperProps,
      checkExists: checkExistsFn,
      checkAccess: checkAccessFn,
      getAuthorizedMe: (message?: string) => {
        if (!helperProps.ctx.me) {
          const errorMessage = message ?? 'Пользователь не авторизован';
          throw new GetAuthorizedMeError(errorMessage);
        }
        return helperProps.ctx.me;
      },
    }) as TProps;
    return <Page {...props} />;
  } catch (error) {
    if (error instanceof CheckExistsError) {
      return (
        <ErrorPageComponent
          title={checkExistsTitle}
          message={error.message || checkExistsMessage}
        />
      );
    }
    if (error instanceof CheckAccessError) {
      return (
        <ErrorPageComponent
          title={checkAccessTitle}
          message={error.message || checkAccessMessage}
        />
      );
    }

    if (error instanceof GetAuthorizedMeError) {
      return (
        <ErrorPageComponent
          title={authorizedOnlyTitle}
          message={error.message || authorizedOnlyMessage}
        />
      );
    }
  }
};

export const withPageWrapper = <TProps extends Props = {}>(
  pageWrapperProps: Omit<PageWrapperProps<TProps>, 'Page'>
) => {
  return (Page: React.FC<TProps>) => {
    return () => <PageWrapper<TProps> {...pageWrapperProps} Page={Page} />;
  };
};
