import './Layout.scss';
import { Link, Outlet } from 'react-router-dom';
import { getAllIdeasRoute, getNewIdeaRoute, getFormPage } from '../../lib/routes';

export const Layout = () => {
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
          <Link to={getNewIdeaRoute()}>New Idea Route</Link>
        </li>
        <li>
          <Link to={getFormPage()}>СТРАНИЦА ФОРМЫ</Link>
        </li>
      </ul>

      <hr />

      <div>
        <Outlet />
      </div>
    </div>
  );
};
