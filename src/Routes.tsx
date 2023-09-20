import { Route, Routes } from "react-router-dom";
import { HomeProvider } from "./contexts/HomeContext";
import { Home } from "./pages/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeProvider>
            <Home />
          </HomeProvider>
        }
      />
    </Routes>
  );
}
