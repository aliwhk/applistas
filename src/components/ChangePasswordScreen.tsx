import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { Screen } from '../types';

interface ChangePasswordScreenProps {
  setScreen: (screen: Screen) => void;
  onPasswordChanged: () => void;
}

export default function ChangePasswordScreen({ setScreen, onPasswordChanged }: ChangePasswordScreenProps) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Error simulation matching mock screenshot
  // By default, showing the error replicates the exact visual state in the mockup!
  const [showMockError, setShowMockError] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showMockError && code !== '123-456') {
      // Keep displaying mock error if code is not the simulation Bypass Code
      return;
    }

    if (!newPassword || !confirmPassword) {
      alert('Por favor, digite e confirme sua senha.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPasswordChanged();
        setScreen('login');
      }, 1500);
    }, 1200);
  };

  const useBypassCode = () => {
    setCode('123-456');
    setShowMockError(false);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0e1114] px-6 pt-6 pb-24 text-gray-100">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-[#1f242e] pb-4">
        <button
          onClick={() => setScreen('forgot')}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#23272e] bg-[#121418] hover:bg-[#1a1e24] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-display text-base font-bold tracking-wider text-white uppercase">
          ALTERAR SENHA
        </span>
        <button
          onClick={handleSubmit}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4c42e9] text-white hover:bg-brand-primary-hover transition-colors shadow-md shadow-brand-primary/20"
        >
          <Check className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {isSuccess && (
          <div className="rounded-lg bg-green-950/40 border border-green-900/50 p-4 text-sm text-green-400">
            Senha alterada com sucesso! Redirecionando para login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Code input */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">
                DIGITE O CODIGO
              </label>
              {showMockError && (
                <button
                  type="button"
                  onClick={useBypassCode}
                  className="text-[10px] text-brand-primary hover:underline hover:text-brand-primary-hover uppercase tracking-wider font-semibold"
                >
                  [ Usar código válido ]
                </button>
              )}
            </div>
            <input
              type="text"
              required
              placeholder="000-000"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (e.target.value === '123-456') {
                  setShowMockError(false);
                }
              }}
              className="w-full h-11 rounded-lg border border-[#23272e] bg-[#121418] px-4 font-mono text-white text-center text-lg tracking-widest outline-none focus:border-brand-primary transition-colors"
            />
            {showMockError && (
              <p className="font-sans text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">
                CODIGO INVALIDO/CODIGO EXPIRADO
              </p>
            )}
          </div>

          {/* New password field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">
              DIGITE A NOVA SENHA
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-11 rounded-lg border border-[#23272e] bg-[#121418] px-4 pr-11 font-sans text-white outline-none focus:border-brand-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">
              CONFIRME A SENHA
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 rounded-lg border border-[#23272e] bg-[#121418] px-4 pr-11 font-sans text-white outline-none focus:border-brand-primary transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted">
                <Lock className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || (showMockError && code !== '123-456')}
            className={`w-full h-11 rounded-lg text-sm font-semibold text-white tracking-wide transition-all duration-300 md:h-12 flex items-center justify-center gap-2 ${
              showMockError && code !== '123-456'
                ? 'bg-brand-primary/40 cursor-not-allowed opacity-55'
                : 'bg-brand-primary hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/35 active:scale-95'
            }`}
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>ALTERAR</span>
                <CheckCircle className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Security tip Box */}
        <div className="rounded-xl border border-[#23272e] bg-[#121418] p-4 flex gap-4 items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-950/40 text-indigo-400 border border-indigo-900/40">
            <Shield className="h-5 w-5 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h4 className="font-sans text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Dica de Segurança
            </h4>
            <p className="font-sans text-xs text-brand-text-muted leading-relaxed">
              Use uma combinação de letras maiúsculas, números e símbolos especiais para garantir que sua nova senha seja forte e proteja suas tarefas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
