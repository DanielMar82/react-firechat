import FormProfile from "@/components/profile/formProfile";
import { useUser } from "reactfire";

const ProfilePage = () => {
  const { data: user } = useUser();

  if (!user) {
    return <div className="text-red-500">Loading...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-medium">Profile</h1>
      <FormProfile user={user} />
    </>
  );
};

export default ProfilePage;
