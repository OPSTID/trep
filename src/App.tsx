// Route Settings
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./views/Home.tsx";
import New from "./views/New.tsx";
import Settings from "./views/Settings.tsx";
import View from "./views/View.tsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/view" element={<View />} />
          <Route path="/new" element={<New />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
