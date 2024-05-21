import { Routes, Route,useNavigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";

import { lazy, useEffect } from "react";
import Dashboard from "./pages/dashboard/DashBoard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SendEmail from "./pages/auth/SendEmail";
import Qrcode from "./components/Qrcode";
const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

export default function App() { 

  return (
    <Routes>
      <Route path="/auth/login" element={<SignIn />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/qrcode" element={<Qrcode />} />
          <Route path="*" element={<div>Error Page</div>} />
          
        </Route>
      </Route>
    </Routes>
  );
}
