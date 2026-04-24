import { Outlet, NavLink } from 'react-router-dom';
import authBg from '../assets/images/auth-bg.jpg';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">

     
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

       
        <img
          src={authBg}
          alt="Spider-Man"
          className="absolute inset-0 w-full h-full object-cover"
        />

     
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-[#0a0a0a]" />

      
        <div className="relative z-10 flex flex-col justify-between w-full p-16">
          <NavLink
            to="/"
            className="text-xl font-black uppercase tracking-widest text-white hover:text-[#FF2020] transition-colors"
          >
            Spider<span className="text-[#FF2020]">-</span>Man
          </NavLink>

          <div>
            <h2 className="text-5xl font-black uppercase leading-tight text-white">
              With Great<br />
              <span className="text-[#FF2020]">Power</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 max-w-xs">
              Comes great responsibility. Join the web and be part of the story.
            </p>
          </div>
        </div>

      </div>

     
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-[#0a0a0a]">

        
        <div className="lg:hidden mb-10">
          <NavLink to="/" className="text-xl font-black uppercase tracking-widest text-white">
            Spider<span className="text-[#FF2020]">-</span>Man
          </NavLink>
        </div>

        <div className="w-full max-w-sm">
          <Outlet />
        </div>

        <p className="mt-12 text-center text-[11px] uppercase tracking-widest text-zinc-700">
          © {new Date().getFullYear()} Spider-Man. All rights reserved.
        </p>

      </div>

    </div>
  );
};

export default AuthLayout;