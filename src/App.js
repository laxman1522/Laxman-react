import React from "react"
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import { AppConstants } from "./constants/appConstants";
import { RouteConstants } from "./constants/routeConstants";
import Home from "./pages/home/Home";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Shopping from "./pages/shopping/Shopping";

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Routes>
              <Route path={`${RouteConstants.Home}`} element={<Home/>}/>
              <Route path={`${RouteConstants.CategoryType}`} element={<Shopping/>}/>
              <Route path={`${RouteConstants.PlaceOrder}`} element={<PlaceOrder/>}/>
              <Route path="*" element={<Navigate to={`${RouteConstants.Home}`} replace />} />
          </Routes>
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
