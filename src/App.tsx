import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ArtworkPage from "./routes/ArtworkPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artwork/:id" element={<ArtworkPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
