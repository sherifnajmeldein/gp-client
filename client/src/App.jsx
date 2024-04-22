
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HomeLayout from "./pages/HomeLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import AvatarApp from "./pages/AvatarApp";
import MCQApp from "./pages/MCQApp";
import QuizApp from "./pages/QuizApp";
import { ToastContainer, toast } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "avatar",
        element: <AvatarApp />,
      },
      {
        path: "mcq",
        element: <MCQApp />,
      },
      {
        path: "quiz",
        element: <QuizApp />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {


  return (
    <>
        <RouterProvider router={router} />
        <ToastContainer position='top-center' />
    </>
  )
}

export default App
