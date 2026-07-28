import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  if (status === "loading" || !hasEmitted) {
    return <h1>Loading...</h1>;
  }

  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <main>
        <header>
          <h1>Header admin</h1>
        </header>
        <div>
          <Outlet />
        </div>

        <footer>
          <h1>Footer admin</h1>
        </footer>
      </main>
    </>
  );
};

export default AdminLayout;
