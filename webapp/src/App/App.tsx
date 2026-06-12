import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrpcProvider } from '../lib/trpc';
import * as routes from '../lib/routes';
import { AllIdeasPage } from '../pages/ideas/AllIdeasPage/Allideaspage';
import { ViewideaPage } from '../pages/ideas/ViewideaPage/ViewideaPage';
import { NewIdeaPage } from '../pages/ideas/NewIdeaPage/NewIdeaPage';
import { Layout } from '../components/Layout/Layout';
import { SignUpPage } from '../pages/auth/SignUpPage/SignUpPage';
import { SignInPage } from '../pages/auth/SignInPage/SignInPage';
import { SignOutPage } from '../pages/auth/SignOutPage/SignOutPage';
import { EditIdeaPage } from '../pages/ideas/EditIdeaPage/EditIdeaPage';
import { AppContextProvider } from '../lib/ctx';
import { NotFoundPage } from '../pages/other/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />}></Route>
              <Route path={routes.getSignInRoute()} element={<SignInPage />}></Route>
              <Route
                path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
                element={<ViewideaPage />}
              />
              <Route
                path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)}
                element={<EditIdeaPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
