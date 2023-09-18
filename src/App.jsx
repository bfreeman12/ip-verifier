import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportPage from "./pages/ReportPage";
import NoPage from "./pages/NoPage";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/reports" element={<ReportPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
