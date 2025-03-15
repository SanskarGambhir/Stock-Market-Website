import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AppContext } from "./context/appContext";
import Login from "./components/login";
import Register from "./components/register";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard";
import InvestmentsPage from "./pages/Investments";
import PortfolioPage from "./pages/Portfolio";
import "./App.css";
import "./index.css";

function App() {
  const { data, setData } = useContext(AppContext);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/investments" element={<InvestmentsPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
