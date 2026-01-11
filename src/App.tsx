import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import ArtworkPage from "./routes/ArtworkPage";

function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* Always define all routes normally */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/artwork/:id" element={<ArtworkPage />} />
      </Routes>

      {/* Render modal overlay only if there's a background */}
      {background && (
        <Routes>
          <Route path="/artwork/:id" element={<ArtworkPage />} />
        </Routes>
      )}
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
