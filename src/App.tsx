import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./routes/Home";
import ArtworkPage from "./routes/ArtworkPage";

function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
    
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
      </Routes>

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
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
