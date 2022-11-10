import ShoppingPage from './pages/shopping/Shopping';
import { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom';
import AboutUsPage from './pages/aboutUs/AboutUs';
import PlaceOrderPage from './pages/placeOrder/PlaceOrder';
import { routeConstants } from './constants/routeConstants';

function App() {
  return (
      <BrowserRouter>
      <Routes>
          <Route path={`${routeConstants.home}:id`}  element={<ShoppingPage/>}></Route>
          <Route path={routeConstants.aboutUs}  element={<AboutUsPage/>}></Route>
          <Route path={routeConstants.placeorder} element={<PlaceOrderPage/>}></Route>
          <Route path="" element={<Navigate to={`${routeConstants.men}`}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
