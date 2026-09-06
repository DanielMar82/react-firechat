import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useUser } from "reactfire";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthActions();

  return (
    <>
      <h2>Dashboard page</h2>
      <p>Bienvenido, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Not provided"}</p>
      <p>User ID: {user?.uid || "Not provided"}</p>
      <Button variant={"destructive"} onClick={logout}>
        logout
      </Button>
    </>
  );
};

export default DashboardPage;
