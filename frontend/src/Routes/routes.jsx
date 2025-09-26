import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserSignup from "../pages/UserSignup";
import UserLogin from "../pages/UserLogin";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import FoodPartnerSignup from "../pages/FoodPartnerSignup";
import ViewFood from "../pages/viewFood";
import FoodPartnerProfile from "../pages/foodPartnerProfile";
import Uploadfood from "../pages/upload_food";
function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/foodPartnerSignup" element={<FoodPartnerSignup />} />
        <Route path="/foodPartnerLogin" element={<FoodPartnerLogin />} />
        <Route path="/Uploadfood" element={<FoodPartnerLogin />} />
        <Route path="/viewFood" element={<ViewFood/>} />
        {/* <Route path="/food/:url" element={<FoodPartnerProfile/>} /> */}
        <Route path="/foodPartnerProfile/:video" element={<FoodPartnerProfile/>}></Route>
        <Route path="/addFood" element={<Uploadfood/>}></Route>
      </Routes>
    </div>
  );
}
export default Router;
