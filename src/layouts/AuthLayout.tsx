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
      <main>
        <header>
          <h1>Header auth</h1>
        </header>
        <div>
          <Outlet />
        </div>

        <footer>
          <h1>Footer auth</h1>
        </footer>
      </main>
    </>
  );
};

export default AuthLayout;
