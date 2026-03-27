import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-900">
      <NavBar />
      <main className="pt-[56px] w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;