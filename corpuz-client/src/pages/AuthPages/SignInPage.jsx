import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="w-full">
      <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
        Welcome Back
      </p>
      <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-white">
        Log In
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-500">
        The city needs you. Access your account.
      </p>

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>

        {/* Email */}
        <div className="group">
          <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
            Email Address
          </label>
          <div className="relative mt-2">
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              className="w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
            />
          </div>
        </div>

        {/* Password */}
        <div className="group">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
              Password
            </label>
            <button
              type="button"
              className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 transition hover:text-[#FF2020]"
            >
              Forgot?
            </button>
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
            />
          </div>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input type="checkbox" className="peer sr-only" />
            <div className="h-5 w-5 rounded border-2 border-zinc-700 bg-[#111] peer-checked:border-[#FF2020] peer-checked:bg-[#FF2020] transition-all duration-200" />
            <svg className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[11px] uppercase tracking-widest text-zinc-500">Remember me</span>
        </label>

        <Button type="submit" variant="primary" className="w-full py-4 text-sm tracking-widest">
          Log In
        </Button>

        {/* Divider */}
        <div className="relative flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[11px] uppercase tracking-widest text-zinc-600">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#111] py-3.5 text-[11px] font-bold uppercase tracking-widest text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#111] py-3.5 text-[11px] font-bold uppercase tracking-widest text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            Apple
          </button>
        </div>

      </form>

      <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-[11px] uppercase tracking-widest text-zinc-600">
        No account?{' '}
        <Link to="/auth/signup" className="text-[#FF2020] transition hover:text-white">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;