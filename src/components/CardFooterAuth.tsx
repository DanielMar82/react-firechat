import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";

  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login successful");
    } else {
      console.log("Login failed:", result.success);
      toast.error("login failed");
    }
  };

  return (
    <>
      <CardFooter className="flex flex-col items-center gap-4">
        <Button
          onClick={handleLoginWithGoogle}
          className="w-full"
          disabled={loading}
          variant={"outline"}
        >
          <Mail className="mr-2" />
          {isLogin ? "Login" : "Register"} con Google
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          {isLogin
            ? "¿No tienes una cuenta todavía? "
            : "¿Ya tienes una cuenta? "}
          <Link to={isLogin ? "/register" : "/login"}>
            <Button variant="link" className="p-0 h-auto font-normal">
              {isLogin ? "Register" : "Sign in"}
            </Button>
          </Link>
        </p>
      </CardFooter>
    </>
  );
};

export default CardFooterAuth;
