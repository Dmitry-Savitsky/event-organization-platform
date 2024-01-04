import Company from "./pages/CompanyPage";
import Client from "./pages/ClientPage";
import Services from "./pages/Services";  // Use regular quotes here
import ServicePage from "./pages/ServicePage";
import Auth from "./pages/Auth";
import {
  CLIENT_ROUTE,
  COMPANY_ROUTE,
  FAQ_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SERVICES_ROUTE,
  SERVICE_ROUTE,
} from "./utils/consts";
import FAQ from "./pages/FAQ";

export const authRoutes = [
  {
    path: COMPANY_ROUTE,
    Component: Company,
  },
  {
    path: CLIENT_ROUTE,
    Component: Client,
  },
];

export const publicRoutes = [
  {
    path: SERVICES_ROUTE,
    Component: Services,
  },
  {
    path: SERVICE_ROUTE + "/:id",
    Component: ServicePage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: FAQ_ROUTE,
    Component: FAQ,
  }
];
