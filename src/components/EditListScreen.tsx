import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Settings, User, CheckCircle } from 'lucide-react';
import { Screen, TaskList, UserProfile } from '../types';
import { INITIAL_USER } from '../initialData';

interface EditListScreenProps {
  list: TaskList | null;
  setScreen: (screen: Screen) => void;
  onUpdateList: (updatedList: TaskList) => void;
  userProfile?: UserProfile;
}

export default function EditListScreen({
  list,
  setScreen,
  onUpdateList,
  userProfile = INITIAL_USER
}: EditListScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  // Sync state with selected list
  useEffect(() => {
    if (list) {
      setTitle(list.title);
      setDescription(list.description);
      setDate(list.date);
    }
  }, [list]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!list) return;

    if (!title.trim()) {
      alert('Por favor, informe o título da lista.');
      return;
    }

    onUpdateList({
      ...list,
      title: title.trim(),
      description: description.trim(),
      date: date.trim()
    });

    setScreen('inicio');
  };

  if (!list) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0e1114] items-center justify-center p-6 text-gray-100">
        <p className="text-sm text-brand-text-muted mb-4">Nenhuma lista selecionada para edição.</p>
        <button
          onClick={() => setScreen('inicio')}
          className="h-10 px-4 bg-brand-primary text-white rounded-lg text-xs font-semibold"
        >
          Voltar para Início
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0e1114] px-6 pt-6 pb-24 text-gray-100 font-sans">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-[#1f242e] pb-4">
        <button
          onClick={() => setScreen('inicio')}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#23272e] bg-[#121418] hover:bg-[#1a1e24] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center text-brand-primary rounded bg-brand-primary/10">
            📝
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Editar Lista
          </span>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-5">
        {/* Title Field - upper-case styled labels */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold tracking-widest text-[#9ca3af] uppercase">
            TÍTULO
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-11 rounded-lg border border-[#23272e] bg-[#121418] px-4 font-sans text-white focus:border-brand-primary outline-none transition-colors"
          />
        </div>

        {/* Description Field */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold tracking-widest text-[#9ca3af] uppercase">
            DESCRIÇÃO
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-[#23272e] bg-[#121418] p-4 text-sm text-white leading-relaxed focus:border-brand-primary outline-none resize-none transition-colors"
          />
        </div>

        {/* Date Field with Calendar Icon */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold tracking-widest text-[#9ca3af] uppercase">
            DATA:
          </label>
          <div className="relative">
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 rounded-lg border border-[#23272e] bg-[#121418] px-4 pr-11 font-sans text-white focus:border-brand-primary outline-none transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted">
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-brand-primary text-sm font-semibold tracking-wide text-white transition-all hover:bg-brand-primary-hover active:scale-[0.98] flex items-center justify-center shadow-lg shadow-brand-primary/20"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => setScreen('inicio')}
            className="w-full h-11 rounded-lg border border-[#23272e] bg-[#121418] text-sm font-bold tracking-wider text-white hover:bg-[#1a1e24] active:scale-[0.98] transition-all uppercase"
          >
            CANCELAR
          </button>
        </div>

        {/* User Profile Banner at bottom - exactly styled from layout mockup */}
        <div 
          onClick={() => setShowProfileInfo(!showProfileInfo)}
          className="mt-6 rounded-xl border border-[#23272e] bg-[#15181c] p-4 flex items-center justify-between cursor-pointer group hover:border-[#353b47] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5244e4]/30 border border-[#5244e4]/50 text-brand-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[9px] font-bold tracking-widest text-[#8a8d93] uppercase">
                USER PROFILE
              </span>
              <p className="font-sans text-sm font-bold text-white group-hover:text-brand-primary transition-colors">
                {userProfile.name}
              </p>
            </div>
          </div>
          <button 
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#20252e] text-brand-text-muted hover:text-white transition-colors"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Dynamic expanded simulated Profile metadata card */}
        {showProfileInfo && (
          <div className="rounded-xl border border-dashed border-[#23272e] bg-[#0c0e11] p-4 text-center animate-in fade-in duration-200">
            <p className="text-xs text-[#9fcbff] font-semibold mb-1">Status da Conta: Membro Ativo</p>
            <p className="text-[11px] text-brand-text-muted leading-relaxed">
              Registrado sob o email institucional: <span className="text-gray-300 underline">{userProfile.email}</span>. Data de adesão: {userProfile.joinedDate}.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
