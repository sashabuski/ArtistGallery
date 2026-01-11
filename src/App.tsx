import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./routes/Home";
import ArtworkPage from "./routes/ArtworkPage";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <>

      <Home />

      <Routes>
        <Route
          path="/artwork/:id"
          element={<ArtworkPage onClose={() => navigate("/")} />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
