import { useState } from "react";
import { updateProfile, type AuthError } from "firebase/auth";
import { useUser } from "reactfire";

export const useProfileActions = () => {
  const [loading, setLoading] = useState(false);
  const { data: user } = useUser();

  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!user) {
      throw new Error("User is not authenticated");
    }
    setLoading(true);

    try {
      await updateProfile(user, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoURL === "" ? null : user.photoURL,
      });
      return { success: true, error: null };
    } catch (error) {
      console.log("Error updating profile:", error);
      throw error;
      return { success: false, error: error as AuthError };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateUserProfile,
  };
};
