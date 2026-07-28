import { useAuth, useUser } from "reactfire";

const DashboardPage = () => {
  const auth = useAuth();
  const { data: user } = useUser();

  return (
    <>
      <h2>Dashboard page</h2>
      <p>Bienvenido, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Not provided"}</p>
      <p>User ID: {user?.uid || "Not provided"}</p>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </>
  );
};

export default DashboardPage;
