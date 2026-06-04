import { Outlet } from 'react-router-dom';
import NavBar from "./Navbar";
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <NavBar />
      <main className="pt-[56px] w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;