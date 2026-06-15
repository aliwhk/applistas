import React, { useState } from 'react';
import { ArrowLeft, Shield, Send, Image as ImageIcon } from 'lucide-react';
import { Screen } from '../types';

interface ForgotPasswordScreenProps {
  setScreen: (screen: Screen) => void;
  onSubmitEmail: (email: string) => void;
}

export default function ForgotPasswordScreen({ setScreen, onSubmitEmail }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('seuemail@exemplo.com');
  const [lastPassword, setLastPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onSubmitEmail(email);
      // Wait a moment then redirect to next screen
      setTimeout(() => {
        setScreen('reset');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0e1114] px-6 pt-6 pb-24 text-gray-100">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between border-b border-[#1f242e] pb-4">
        <button
          onClick={() => setScreen('login')}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#23272e] bg-[#121418] hover:bg-[#1a1e24] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-display text-base font-bold tracking-wider text-brand-primary uppercase">
          ESQUECEU A SENHA
        </span>
        <div className="flex h-10 w-12 items-center justify-center rounded bg-[#1e242e] text-[10px] uppercase tracking-wider text-brand-text-muted font-bold">
          img
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-white mb-3">
            REDEFINIR
          </h2>
          <p className="font-sans text-sm text-brand-text-muted leading-relaxed">
            Forneça os detalhes abaixo para recuperar o acesso à sua conta. Enviaremos um código de verificação para o seu e-mail cadastrado.
          </p>
        </div>

        {success && (
          <div className="rounded-lg bg-green-950/40 border border-green-900/50 p-4 text-sm text-green-400">
            Código de redefinição enviado! Redirecionando para alteração de senha...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">
              DIGITE SEU EMAIL
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full h-12 rounded-lg border border-[#23272e] bg-[#121418] px-4 font-sans text-white outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          {/* Last remembered password */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-wider text-brand-text-muted uppercase">
              DIGITE A ULTIMA SENHA QUE SE LEMBRA
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={lastPassword}
              onChange={(e) => setLastPassword(e.target.value)}
              className="w-full h-12 rounded-lg border border-[#23272e] bg-[#121418] px-4 font-sans text-white outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          {/* Submit Button - exact proportion of mockup: a medium-sized aligned box */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-w-[130px] px-6 h-11 items-center justify-center rounded-lg bg-brand-primary text-sm font-semibold tracking-wide text-white transition-all hover:bg-brand-primary-hover active:scale-95 disabled:opacity-50 gap-2"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>ENVIAR</span>
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Info Card */}
        <div className="relative overflow-hidden rounded-xl border border-[#23272e] bg-[#121418] p-5">
          {/* subtle lock icon watermark simulation */}
          <div className="absolute right-6 bottom-4 text-[50px] font-bold text-[#1a1e24] select-none pointer-events-none stroke-current opacity-30">
            🔒
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950/40 text-blue-400 border border-blue-900/40">
              <Shield className="h-6 w-6 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <span className="block font-sans text-xs font-bold tracking-wide text-blue-400 uppercase">
                Segurança Ativa
              </span>
              <p className="font-sans text-xs text-brand-text-muted leading-relaxed">
                Sua segurança é nossa prioridade. Todos os processos de recuperação são criptografados de ponta a ponta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
