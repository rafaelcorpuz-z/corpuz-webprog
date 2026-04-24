import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="w-full">
      <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">
        Join The Web
      </p>
      <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-white">
        Sign Up
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-500">
        With great power comes great responsibility.
      </p>

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>

        {/* Name row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
              First Name
            </label>
            <input
              type="text"
              placeholder="Peter"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
            />
          </div>
          <div className="group">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Parker"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
            />
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
          />
        </div>

        {/* Password */}
        <div className="group">
          <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
          />
          <p className="mt-2 text-[11px] text-zinc-700">
            Min. 8 characters — letters, numbers & symbols.
          </p>
        </div>

        {/* Confirm Password */}
        <div className="group">
          <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-4 text-sm tracking-widest">
          Create Account
        </Button>

      </form>

      <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-[11px] uppercase tracking-widest text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="text-[#FF2020] transition hover:text-white">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;