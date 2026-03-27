import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrpcProvider } from "../lib/trpc";
import * as routes from "../lib/routes";
import { AllIdeasPage } from "../pages/AllIdeasPage/Allideaspage.tsx";
import { ViewideaPage } from "../pages/ViewideaPage/ViewideaPage.tsx";
import { NewIdeaPage } from "../pages/NewIdeaPage/NewIdeaPage.tsx";
import { Layout } from "../components/Layout/Layout.tsx";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={routes.getAllIdeasRoute()}
              element={<AllIdeasPage />}
            />
            <Route
              path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
              element={<ViewideaPage />}
            />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
