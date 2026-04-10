import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">

      {/* Subtle web grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #FF2020 0px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, #FF2020 0px, transparent 1px, transparent 60px)
          `,
        }}
      />

      <div className="relative text-center">
        <p className="text-[180px] font-black leading-none text-[#FF2020]/10 select-none sm:text-[260px]">
          404
        </p>

        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="75" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="80" cy="80" r="55" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="80" cy="80" r="35" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="80" cy="80" r="15" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="80" y1="5" x2="80" y2="155" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="5" y1="80" x2="155" y2="80" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="27" y1="27" x2="133" y2="133" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <line x1="133" y1="27" x2="27" y2="133" stroke="#FF2020" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="80" cy="80" r="6" fill="#FF2020" />
          </svg>
        </div>

        <div className="relative mt-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
            Oops — Web Not Found
          </p>
          <h1 className="text-4xl font-black uppercase text-white sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-4 max-w-md mx-auto text-sm leading-7 text-zinc-400">
            Looks like this web led nowhere, my friend. Even Spider-Man
            takes wrong turns sometimes. The link you followed must be broken.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#FF2020] bg-[#FF2020] px-6 py-3 text-[11px] font-black uppercase tracking-widest text-white transition hover:bg-transparent hover:text-[#FF2020]"
            >
              Back to Home
            </Link>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-700 px-6 py-3 text-[11px] font-black uppercase tracking-widest text-zinc-400 transition hover:border-[#FF2020] hover:text-[#FF2020]"
            >
              View Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;