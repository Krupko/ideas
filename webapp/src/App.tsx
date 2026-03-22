import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TrpcProvider } from "./lib/trpc";
import { getAllIdeasRoute, getViewIdeaRoute } from "./lib/routes";
import { AllIdeasPage } from "./pages/AllIdeasPage/";
import { ViewideaPage } from "./pages/ViewideaPage/";

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route
            path={getViewIdeaRoute({ ideaNick: ":ideaNick" })}
            element={<ViewideaPage />}
          />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
