import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TrpcProvider } from '../lib/trpc';
import * as routes from '../lib/routes';
import { AllIdeasPage } from '../pages/AllIdeasPage/Allideaspage';
import { ViewideaPage } from '../pages/ViewideaPage/ViewideaPage';
import { NewIdeaPage } from '../pages/NewIdeaPage/NewIdeaPage';
import { FormPage } from '../pages/FormPage/FormPage';
import { Layout } from '../components/Layout/Layout';
import { SignUpPage } from '../pages/SignUpPage/SignUpPage';
import { SignInPage } from '../pages/SignInPage/SignInPage';
import { SignOutPage } from '../pages/SignOutPage/SignOutPage';

export const App = () => {
  return (
    <TrpcProvider>
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
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getFormPage()} element={<FormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
