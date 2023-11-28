import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportsPage from "./pages/ReportsPage";
import ReportPage from "./pages/ReportPage";
import AllIps from "./pages/AllIPs";
import SingleIP from "./pages/SingleIP";
import NoPage from "./pages/NoPage";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/all-ips" element={<AllIps />} />
        <Route path="/single-ip/:ip" element={<SingleIP ip=":ip" />} />
        <Route path="/report/:uid" element={<ReportPage reportuid=":uid" />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
