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
    <footer className="bg-[#0a0a0a] border-t border-zinc-900">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <NavLink to="/" className="flex items-center gap-2 group">
            <WebIcon />
            <span className="text-base font-black uppercase tracking-widest text-white group-hover:text-[#FF2020] transition-colors duration-300">
              Spider<span className="text-[#FF2020]">-</span>Man
            </span>
          </NavLink>
          <nav className="flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[#FF2020]' : 'text-zinc-600 hover:text-[#FF2020]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="my-8 border-t border-zinc-900" />

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-zinc-700 uppercase tracking-widest">
            © {new Date().getFullYear()} Spider-Man. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-800 uppercase tracking-widest">
            With great power comes great responsibility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;