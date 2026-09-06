import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";

const LoginPage = () => {
  const { loading } = useAuthActions();

  return (
    <>
      <Card className="bg-blue-200">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Inicia sesión en tu cuenta usando el email y la cotraseña o con la
            cuenta de google
          </CardDescription>
        </CardHeader>
        <CardContent>...</CardContent>
        <CardFooterAuth type="login" loading={loading} />
      </Card>
    </>
  );
};

export default LoginPage;
