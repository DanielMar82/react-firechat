import { Link } from "react-router";

const HomePage = () => {
  return (
    <>
      <h1>HOMEPAGE</h1>
      <Link to={"login"}>Login</Link>
      <br />
      <Link to={"admin"}>dashboard</Link>
    </>
  );
};

export default HomePage;
