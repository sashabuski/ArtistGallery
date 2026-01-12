import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import ArtworkPage from "./routes/ArtworkPage";
import AboutPage from "./routes/AboutPage";
import JournalPage from "./routes/JournalPage";
import VideoPage from "./routes/VideoPage";
import ArchivePage from "./routes/ArchivePage";
import ContactPage from "./routes/ContactPage";

function AppRoutes() {
  return (
    <>
      <Home />
      <Routes>
        <Route path="/artwork/:id" element={<ArtworkPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/contact" element={<ContactPage />} />
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
