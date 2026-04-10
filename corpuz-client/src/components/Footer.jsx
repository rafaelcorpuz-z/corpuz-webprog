import { NavLink } from 'react-router-dom';

const WebIcon = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#FF2020" strokeWidth="1.5" />
    <line x1="14" y1="1" x2="14" y2="27" stroke="#FF2020" strokeWidth="1" />
    <line x1="1" y1="14" x2="27" y2="14" stroke="#FF2020" strokeWidth="1" />
    <path d="M14 1 Q21 8 21 14 Q21 20 14 27" stroke="#FF2020" strokeWidth="1" fill="none" />
    <path d="M14 1 Q7 8 7 14 Q7 20 14 27" stroke="#FF2020" strokeWidth="1" fill="none" />
    <path d="M2 8 Q14 11 26 8" stroke="#FF2020" strokeWidth="1" fill="none" />
    <path d="M2 20 Q14 17 26 20" stroke="#FF2020" strokeWidth="1" fill="none" />
  </svg>
);

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const Footer = () => {
  return (
    <footer className="border-t border-[#FF2020]/20 bg-[#0a0a0a]">

      {/* Top red line accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF2020] to-transparent opacity-60" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <WebIcon />
            <span className="text-base font-black uppercase tracking-widest text-white group-hover:text-[#FF2020] transition-colors">
              Spider<span className="text-[#FF2020]">-</span>Man
            </span>
          </NavLink>

          {/* Nav Links */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[11px] font-bold uppercase tracking-widest transition ${
                    isActive ? 'text-[#FF2020]' : 'text-zinc-500 hover:text-[#FF2020]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

        </div>

        {/* Divider */}
        <div className="my-6 border-t border-[#FF2020]/10" />

        {/* Bottom row */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-zinc-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Spider-Man. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-700 uppercase tracking-widest">
            With great power comes great responsibility.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;