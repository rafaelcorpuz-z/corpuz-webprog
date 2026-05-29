import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserService.jsx';
import Button from '../../components/Button';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', age: '', gender: '',
    contactNumber: '', email: '', type: 'editor',
    username: '', password: '', address: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (!/^\d{11}$/.test(form.contactNumber)) return 'Contact number must be exactly 11 digits.';
    if (isNaN(Number(form.age))) return 'Age must be a number only.';
    if (/\s/.test(form.username)) return 'Username must not contain spaces.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    try {
      await createUser({ ...form, isActive: true });
      navigate('/auth/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    }
  };

  const inputClass = "mt-2 w-full rounded-xl border border-zinc-800 bg-[#111] px-4 py-4 text-sm text-white outline-none placeholder:text-zinc-700 transition-all duration-300 focus:border-[#FF2020] focus:bg-[#150000] focus:ring-1 focus:ring-[#FF2020]/20";
  const labelClass = "text-[11px] font-bold uppercase tracking-widest text-zinc-500";

  return (
    <div className="w-full">
      <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#FF2020]">Join The Web</p>
      <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-white">Sign Up</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-500">With great power comes great responsibility.</p>

      {error && (
        <div className="mt-4 rounded-xl border border-[#FF2020]/40 bg-[#FF2020]/10 px-4 py-3 text-sm text-[#FF2020]">
          {error}
        </div>
      )}

      <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input name="firstName" type="text" placeholder="Peter" value={form.firstName} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input name="lastName" type="text" placeholder="Parker" value={form.lastName} onChange={handleChange} required className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Age</label>
            <input name="age" type="text" placeholder="22" value={form.age} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Contact Number</label>
          <input name="contactNumber" type="text" placeholder="09XXXXXXXXX" value={form.contactNumber} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email Address</label>
          <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input name="address" type="text" placeholder="Your address" value={form.address} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Username</label>
          <input name="username" type="text" placeholder="peterparker" value={form.username} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className={inputClass} />
          <p className="mt-1 text-[11px] text-zinc-700">Min. 8 characters.</p>
        </div>
        <Button type="submit" variant="primary" className="w-full py-4 text-sm tracking-widest">
          Create Account
        </Button>
      </form>

      <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-[11px] uppercase tracking-widest text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="text-[#FF2020] transition hover:text-white">Log In</Link>
      </div>
    </div>
  );
};

export default SignUpPage;