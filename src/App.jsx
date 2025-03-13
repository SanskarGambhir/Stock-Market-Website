import { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/appContext";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  const { data, setData } = useContext(AppContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>{data}</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
