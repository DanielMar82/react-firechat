import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {
  const auth = useAuth();

  const handleCLickGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in successfully");
    } catch (error) {
      console.log("Error signing in with google: " + error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <button onClick={handleCLickGoogle}>Registrate con Google</button>
    </>
  );
};

export default RegisterPage;
