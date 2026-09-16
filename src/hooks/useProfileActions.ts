import { useState } from "react";
import { updateProfile, type AuthError } from "firebase/auth";
import { useUser } from "reactfire";
import { useUserActions } from "./useUserActions";

export const useProfileActions = () => {
  const [loading, setLoading] = useState(false);
  const { data: user } = useUser();

  const { createOrUpdateUser } = useUserActions();

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

      //Actualiza el usuario en fireStore
      await createOrUpdateUser({ ...user, ...data });

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
