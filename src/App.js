import React from "react"
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Shopping from "./pages/shopping/Shopping";

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Routes>
              <Route path="" element={<Home/>}/>
              <Route path="/*" element={<Shopping/>}/>
          </Routes>
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
