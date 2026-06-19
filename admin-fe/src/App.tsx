import { BrowserRouter as Router, Routes, Route } from "react-router";

import SignIn from "./pages/AuthPages/SignIn";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";

import Home from "./pages/Dashboard/Home";

import UserProfiles from "./pages/UserProfiles";

import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import AccountForm from "./pages/AccountForm";
import { auth } from "./firebase/firebase";

export default function App() {
  console.log("Firebase OK:", auth);
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Home />} />

          {/* Products */}
          <Route path="/products" element={<Products />} />

          {/* Edit Personal Information */}
          <Route path="/profile" element={<UserProfiles />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/product/create" element={<ProductForm />} />

          <Route path="/account/create" element={<AccountForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
