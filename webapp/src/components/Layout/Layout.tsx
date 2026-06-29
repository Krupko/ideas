import './Layout.scss';
import { Link, Outlet } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignUpRoute,
  getSignInRoute,
  getSignOutRoute,
  getEditProfileRoute,
} from '../../lib/routes';
import { useMe } from '../../lib/ctx';
import { createRef } from 'react';

export const layoutContentElRef = createRef<HTMLDivElement>();

export const Layout = () => {
  const me = useMe();

  return (
    <div>
      <p>
        <b>IdeaNick</b>
      </p>

      <ul className="layout__list">
        <li>
          <Link to={getAllIdeasRoute()}>All Ideas</Link>
        </li>

        {me ? (
          <>
            <li>
              <Link to={getNewIdeaRoute()}>СТРАНИЦА НОВОЙ ИДЕИ</Link>
            </li>
            <li>
              <Link to={getEditProfileRoute()}>РЕДАКТИРОВАТЬ ПРОФИЛЬ</Link>
            </li>
            <li>
              <Link to={getSignOutRoute()}>ВЫЙТИ ИЗ АККАУНТА - {me.nick}</Link>
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

      <div ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  );
};
