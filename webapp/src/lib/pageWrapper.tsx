import { type UseTRPCQueryResult, type UseTRPCQuerySuccessResult } from '@trpc/react-query/shared';
import { useNavigate } from 'react-router-dom';
import { useAppContext, type AppContext } from './ctx';
import React, { useEffect } from 'react';
import { ErrorPageComponent } from '../components/ErrorPageComponent/ErrorPageComponent';
import { getAllIdeasRoute } from './routes';

type Props = Record<string, unknown>;
type QueryResult = UseTRPCQueryResult<unknown, unknown>;
type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQuerySuccessResult<
  NonNullable<TQueryResult['data']>,
  null
>;
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext;
  queryResult: TQueryResult extends QueryResult ? QuerySuccessResult<TQueryResult> : undefined;
};
/* eslint-disable no-unused-vars */
type PageWrapperProps<TProps extends Props, TQueryResult extends QueryResult | undefined> = {
  redirectAuthorized?: boolean;

  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkAccessTitle?: string;
  checkAccessMessage?: string;

  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => TQueryResult;
  setProps?: (helperProps: HelperProps<TQueryResult>) => TProps;
  Page: React.FC<TProps>;
};
/* eslint-enable no-unused-vars */

const PageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>({
  authorizedOnly,
  authorizedOnlyTitle = 'Пожалуйста авторизуйтесь!',
  authorizedOnlyMessage = 'Эта страница доступна только авторизованым',
  redirectAuthorized,
  checkAccess,
  checkAccessTitle = 'Доступ запрещен!',
  checkAccessMessage = 'У вас нет доступа к этой странице',
  checkExists,
  checkExistsTitle = 'Не найдено',
  checkExistsMessage = 'Этой страницы не существует',
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
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
    return <p>Загрузка !!!!!!!!!!!!!!1...</p>;
  }

  if (queryResult?.isError) {
    const errorMessage =
      queryResult.error instanceof Error ? queryResult.error.message : 'Произошла ошибка';
    return <ErrorPageComponent message={errorMessage} />;
  }

  if (authorizedOnly && !ctx.me) {
    return <ErrorPageComponent title={authorizedOnlyTitle} message={authorizedOnlyMessage} />;
  }

  const helperProps = { ctx, queryResult: queryResult as never };

  if (checkAccess) {
    const accessDenied = !checkAccess(helperProps);
    if (accessDenied) {
      return <ErrorPageComponent title={checkAccessTitle} message={checkAccessMessage} />;
    }
  }

  if (checkExists) {
    const notExists = !checkExists(helperProps);
    if (notExists) {
      return <ErrorPageComponent title={checkExistsTitle} message={checkExistsMessage} />;
    }
  }

  const props = setProps?.(helperProps) as TProps;
  return <Page {...props} />;
};

export const withPageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />;
  };
};
