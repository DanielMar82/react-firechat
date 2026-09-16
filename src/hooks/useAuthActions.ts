import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type AuthError,
} from "firebase/auth";
import { useState } from "react";
import { useAuth } from "reactfire";
import { useUserActions } from "./useUserActions";

interface AuthActionsResponse {
  success: boolean;
  error: AuthError | null;
}

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const { createOrUpdateUser } = useUserActions();

  const login = async (data: {
    email: string;
    password: string;
  }): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    displayName: string;
  }): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      const currentUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (currentUser.user) {
        await updateProfile(currentUser.user, {
          displayName: data.displayName,
        });

        //Crea y guarda el usuario en FireStore
        await createOrUpdateUser(currentUser.user);

        await currentUser.user.reload();
      }

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(auth, provider);

      //Crea y guarda el usuario en FireStore
      await createOrUpdateUser(data.user);

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<AuthActionsResponse> => {
    setLoading(true);
    try {
      await signOut(auth);

      return {
        success: true,
        error: null,
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
  };
};
