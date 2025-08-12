import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";
import UserCreate from "./pages/UserCreate";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/new",
    element: (
      <ProtectedRoute>
        <UserCreate />
      </ProtectedRoute>
    ),
  },
]);

export default router;
