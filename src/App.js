import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/common/Header";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUs";
import PricingPage from "./pages/Pricing";
import ProductsPage from "./pages/Products";
import NotFoundPage from "./pages/NotFoundPage";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import OrderSupport from "./components/customer/OrderSupport";
import OrderHistory from "./components/customer/OrderHistory";
import DriverDashboard from "./components/driver/DriverDashboard";
import DriverPerformance from "./components/driver/Driverperformance";
import DriverTasks from "./components/driver/DriverTasks";
import GetStarted from "./pages/GetStarted";
import NewOrder from "./pages/NewOrder";

// Styled Content Wrapper
const ContentWrapper = styled.div`
  padding-top: 0px; /* Ensures content starts below the fixed header */
  min-height: calc(100vh - 80px); /* Adjusts for header height */
  background-color: #f0f0f0;
`;

const App = () => {
  return (
    <Router>
      <Header />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/products" element={<ProductsPage />} />

          {/* Customers Routes */}
          <Route path="/customers/dashboard" element={<CustomerDashboard />} />
          <Route path="/order-support" element={<OrderSupport />} />
          <Route path="/customers/history" element={<OrderHistory />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/getstarted" element={<GetStarted />} />
          <Route path="/order-history" element={<OrderHistory />} />

          {/* Drivers Routes */}
          <Route path="/drivers/dashboard" element={<DriverDashboard />} />
          <Route path="/drivers/performance" element={<DriverPerformance />} />
          <Route path="/drivers/tasks" element={<DriverTasks />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
};

export default App;
