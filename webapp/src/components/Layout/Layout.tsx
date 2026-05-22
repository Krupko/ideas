import './Layout.scss';
import { Link, Outlet } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getFormPage,
  getSignUpRoute,
  getSignInRoute,
  getSignOutRoute,
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <div>
      <p>
        <b>IdeaNick</b>
      </p>

      <ul className="layout__list">
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>
        <li>
          <Link to={getFormPage()}>СТРАНИЦА ФОРМЫ</Link>
        </li>
        {isLoading || isFetching || isError ? null : data?.me ? (
          <>
            <li>
              <Link to={getNewIdeaRoute()}>Страница идеи</Link>
            </li>
            <li>
              <Link to={getSignOutRoute()}>ВЫЙТИ ИЗ АККАУНТА</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={getSignUpRoute()}>СТРАНИЦА РЕГИСТРАЦИИ</Link>
            </li>
            <li>
              <Link to={getSignInRoute()}>СТРАНИЦА ВХОДА</Link>
            </li>
          </>
        )}
      </ul>

      <hr />

      <div>
        <Outlet />
      </div>
    </div>
  );
};
