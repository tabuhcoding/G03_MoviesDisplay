import { Outlet } from "react-router-dom";
import Navigation from "./layout/Navigation";
import Footer from "./layout/Footer";

function MainLayout() {
  return (
    <>
      <Navigation />
      <main>
        <div className="d-flex flex-column min-vh-100">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
