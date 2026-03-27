import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "relative px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300",
    isActive
      ? "text-[#FF2020] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#FF2020]"
      : "text-zinc-300 hover:text-[#FF2020] hover:scale-105",
  ].join(" ");

const WebIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#FF2020" strokeWidth="1.5" />
    <line x1="14" y1="1" x2="14" y2="27" stroke="#FF2020" strokeWidth="1" />
    <line x1="1" y1="14" x2="27" y2="14" stroke="#FF2020" strokeWidth="1" />
    <path d="M14 1 Q21 8 21 14 Q21 20 14 27" stroke="#FF2020" strokeWidth="1" fill="none" />
    <path d="M14 1 Q7 8 7 14 Q7 20 14 27" stroke="#FF2020" strokeWidth="1" fill="none" />
    <path d="M2 8 Q14 11 26 8" stroke="#FF2020" strokeWidth="1" fill="none" />
    <path d="M2 20 Q14 17 26 20" stroke="#FF2020" strokeWidth="1" fill="none" />
  </svg>
);

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#FF2020]/30 bg-[#0a0a0a]/95 backdrop-blur-md">
      {/* Subtle web pattern top bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF2020] to-transparent opacity-60" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        {/* LOGO — replace text with your own SVG logo here */}
        {/* ⬇️ LINE 33 — LOGO AREA: swap the content below with your custom logo image/SVG */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <WebIcon />
          <span className="text-lg font-black uppercase tracking-widest text-white group-hover:text-[#FF2020] transition-colors duration-300">
            Spider<span className="text-[#FF2020]">-</span>Man
          </span>
        </NavLink>
        {/* ⬆️ LINE 39 — END OF LOGO AREA */}

        {/* NAV LINKS */}
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;