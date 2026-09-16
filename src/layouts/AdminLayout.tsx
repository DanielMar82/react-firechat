import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  if (status === "loading" || !hasEmitted) {
    return <h1>Loading...</h1>;
  }

  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  );
};

export default AdminLayout;

const AuthenticatedLayout = () => {
  useUser({ suspense: true });

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
};
