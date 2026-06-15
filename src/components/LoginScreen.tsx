import React, { useState } from 'react';
import { CheckSquare, User, Eye, EyeOff } from 'lucide-react';
import { Screen } from '../types';

interface LoginScreenProps {
  setScreen: (screen: Screen) => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginScreen({ setScreen, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: 'error', text: 'Por favor, digite seu e-mail.' });
      return;
    }
    if (!password) {
      setMessage({ type: 'error', text: 'Por favor, digite sua senha.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
      setScreen('inicio');
    }, 800);
  };

  // Demo account filler
  const fillModelCredentials = () => {
    setEmail('seuemail@exemplo.com');
    setPassword('senhaForte123!');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0e1114] px-6 pt-6 pb-24 text-gray-100">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4c42e9] text-white">
            <CheckSquare className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">TaskFlow</span>
        </div>
        <div className="h-10 w-10 overflow-hidden rounded-full border border-brand-border bg-[#181c1f] flex items-center justify-center">
          <User className="h-5 w-5 text-brand-text-muted" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="relative inline-block">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white mb-2">login</h1>
            <div className="absolute left-1/2 -bottom-1 h-1 w-12 -translate-x-1/2 rounded-full bg-[#4c42e9]" />
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-lg p-4 text-sm ${
              message.type === 'error' ? 'bg-red-950/40 text-red-400 border border-red-900/50' : 'bg-green-950/40 text-green-400 border border-green-900/50'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@exemplo.com"
              className="w-full h-12 rounded-lg border border-[#23272e] bg-[#121418] px-4 font-sans text-white placeholder-gray-600 outline-none transition-colors duration-200 focus:border-brand-primary"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">SENHA</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-lg border border-[#23272e] bg-[#121418] px-4 pr-12 font-sans text-white placeholder-gray-600 outline-none transition-colors duration-200 focus:border-brand-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-white transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setScreen('forgot')}
                className="text-xs font-medium text-brand-primary hover:underline hover:text-brand-primary-hover"
              >
                esqueceu a senha?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-brand-primary text-sm font-semibold text-white tracking-wide transition-all duration-300 hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-50 flex items-center justify-center shadow-lg shadow-brand-primary/20"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              'Entrar'
            )}
          </button>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={() => setMessage({ type: 'success', text: 'Ambiente de Simulação: Nova conta criada com êxito!' })}
            className="w-full h-12 rounded-lg border border-[#23272e] bg-[#121418] text-sm font-semibold text-white tracking-wide transition-all duration-200 hover:bg-[#1a1e24] active:scale-[0.98]"
          >
            Criar nova conta
          </button>
        </form>

        {/* Demo Fill Aid */}
        <div className="mt-8 text-center">
          <button
            onClick={fillModelCredentials}
            className="text-xs text-brand-text-muted hover:text-brand-primary underline decoration-dashed"
          >
            Preencher credenciais demonstrativas (Pre-set)
          </button>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-[11px] leading-relaxed text-[#4e555e]">
          Ao entrar, você concorda com nossos{' '}
          <a href="#" className="text-brand-primary hover:underline font-medium">Termos de Serviço</a>{' '}
          e{' '}
          <a href="#" className="text-brand-primary hover:underline font-medium">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
