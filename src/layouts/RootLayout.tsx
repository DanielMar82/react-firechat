import { Outlet } from "react-router";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
};

export default RootLayout;
