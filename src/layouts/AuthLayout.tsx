import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  if (status === "loading" || !hasEmitted) {
    return <h1>Loading...</h1>;
  }

  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
