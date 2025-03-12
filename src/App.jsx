import { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "./context/appContext";

function App() {
  const { data, setData } = useContext(AppContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>{data}</h1>} />
        <Route path="/contact" element={<h1>CONTACT</h1>} />
      </Routes>
    </>
  );
}

export default App;
