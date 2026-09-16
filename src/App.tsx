import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/public/HomePage";
import NotfoundPage from "./pages/public/NotfoundPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfilePage from "./pages/admin/ProfilePage";
import ChatPage from "./pages/admin/ChatPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TaskPage from "./pages/admin/TaskPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotfoundPage />} />
          </Route>

          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="task" element={<TaskPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
