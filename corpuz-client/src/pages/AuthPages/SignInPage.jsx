import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/UserService.jsx';
import Button from '../../components/Button';

const SignInPage = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.firstName);
      localStorage.setItem('type', data.type);
      navigate('/dashboard', { state: { firstName: data.firstName, type: data.type } });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
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

      {error && (
        <div className="mt-4 rounded-xl border border-[#FF2020]/40 bg-[#FF2020]/10 px-4 py-3 text-sm text-[#FF2020]">
          {error}
        </div>
      )}

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <div className="group">
          <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
            Email Address
          </label>
          <div className="relative mt-2">
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
            />
          </div>
        </div>

        <div className="group">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-focus-within:text-[#FF2020] transition-colors">
              Password
            </label>
          </div>
          <div className="relative mt-2">
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full py-4 text-sm tracking-widest">
          Log In
        </Button>
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