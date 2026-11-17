import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock, FiAlertCircle } from 'react-icons/fi';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none ' +
  'placeholder:text-white/30 focus:border-teal-500/60 focus:ring-2 focus:ring-teal-500/20 transition';

const Login = ({ onLogin, notice }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-white/[.08] bg-white/[.03] p-7 shadow-2xl sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
            <FiLock size={22} />
          </div>
          <h1 className="text-xl font-bold text-white">Portfolio admin</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to edit your site's content.</p>
        </div>

        {notice && !error && (
          <p className="mb-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-300">{notice}</p>
        )}
        {error && (
          <p role="alert" className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
            <FiAlertCircle className="mt-0.5 flex-shrink-0" /> {error}
          </p>
        )}

        <label htmlFor="admin-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          className={`${inputCls} mb-4`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Password
        </label>
        <div className="relative mb-6">
          <input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            className={`${inputCls} pr-11`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-white"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition hover:bg-teal-400 disabled:opacity-60"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <a href="/" className="mt-5 block text-center text-xs text-slate-500 hover:text-teal-400">
          ← Back to portfolio
        </a>
      </form>
    </div>
  );
};

export default Login;
