import { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/appContext";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./layout";
import ErrorPage from "./components/errorpage";
import ChatBot from "./components/Chatbot";
import Pay from "./components/Pay";

function App() {
  const { data } = useContext(AppContext);

  return (
    <Routes>
      {/* Authentication Routes (No Layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout Wrapper for Other Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<h1>{data}</h1>} />
        <Route path="about" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/chat" element={<ChatBot />} />
        <Route path="/pay" element={<Pay />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
