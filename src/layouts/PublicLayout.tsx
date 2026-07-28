import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <>
      <main>
        <header>
          <h1>Header public</h1>
        </header>
        <div>
          <Outlet />
        </div>

        <footer>
          <h1>Footer public</h1>
        </footer>
      </main>
    </>
  );
};

export default PublicLayout;
