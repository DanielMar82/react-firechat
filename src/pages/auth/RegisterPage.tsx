import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";

const RegisterPage = () => {
  const { loading } = useAuthActions();

  return (
    <>
      <Card className="bg-green-200">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Registrate en tu cuenta usando el email y la cotraseña o con la
            cuenta de google
          </CardDescription>
        </CardHeader>
        <CardContent>...</CardContent>
        <CardFooterAuth type="register" loading={loading} />
      </Card>
    </>
  );
};

export default RegisterPage;
