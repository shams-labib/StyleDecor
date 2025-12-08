import { createBrowserRouter } from "react-router"; // ensure react-router-dom
import RootLayouts from "../Layouts/RootLayouts";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Landing/Home/Home";

import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Form/Register/Register";
import Login from "../Form/Login/Login";
import ProfileCard from "../Pages/Profile/Profile";
import ServicesPage from "../Pages/Services Page/ServicesPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import CreateDecoratorForm from "../Pages/Dashboard/Admin/CreateDecorator/CreateDecoratorForm ";
import DecoratorList from "../Pages/Dashboard/Admin/DecoratorList/DecoratorList";
import AllUsers from "../Pages/Dashboard/Admin/All Users/AllUsers";
import CreateService from "../Pages/Dashboard/Admin/CreateService/CreateService";
import ServicesDashboardComponent from "../Pages/Dashboard/Admin/ServicesList/ServicesList";
import ServiceDetailsPage from "../Pages/Services Page/ServiceDetailsPage/ServiceDetailsPage";
import MyBookings from "../Pages/Dashboard/User/MyProfile/MyBookings";
import PaymentSuccess from "../Pages/Dashboard/User/PaymentSuccess/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/User/PaymentCancel/PaymentCancel";

import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory/PaymentHistory";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings/ManageBookings";
import AssignDeliveries from "../Pages/DecoratorPage/AssignDeliveries/AssignDeliveries";
import Todayshedule from "../Pages/DecoratorPage/Todayshedule/Todayshedule";
import EarningSummary from "../Pages/DecoratorPage/Earning Summary/EarningSummary";

import AboutUsPage from "../Pages/AboutUs/AboutPage";
// import AdminDashboardHome from "../Pages/Dashboard/Admin/AdminDashboardHome/AdminDashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/services", element: <ServicesPage /> },
      {
        path: "/servicesDetails/:id",
        element: <ServiceDetailsPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage></AboutUsPage>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },

  // Dashboard route
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "create-decorator",
        Component: CreateDecoratorForm,
      },
      {
        path: "decorator-list",
        Component: DecoratorList,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "create-services",
        Component: CreateService,
      },
      {
        path: "services-list",
        Component: ServicesDashboardComponent,
      },
      // User Path
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      { path: "my-profile", Component: ProfileCard },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment-cancelled", Component: PaymentCancel },
      { path: "payment-history", Component: PaymentHistory },
      { path: "manage-bookings", Component: ManageBookings },
      { path: "assigned-deliveries", Component: AssignDeliveries },
      { path: "today-shedule", Component: Todayshedule },
      { path: "earings-summary", Component: EarningSummary },
      // { path: "admin-dashboard", Component: AdminDashboardHome },
    ],
  },
]);
