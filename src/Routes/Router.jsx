import { createBrowserRouter } from "react-router"; // ensure react-router-dom
import RootLayouts from "../Layouts/RootLayouts";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Landing/Home/Home";
import About from "../Pages/Landing/About/About";
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "/profile", element: <ProfileCard /> },
      { path: "/services", element: <ServicesPage /> },
      {
        path: "/servicesDetails/:id",
        element: <ServiceDetailsPage />,
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
        path: "my-profile",
        Component: MyBookings,
      },
    ],
  },
]);
