import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Screen, TaskList } from '../types';

interface NewListScreenProps {
  setScreen: (screen: Screen) => void;
  onAddList: (newList: Omit<TaskList, 'id' | 'completed' | 'itemCount' | 'tasks'>) => void;
}

export default function NewListScreen({ setScreen, onAddList }: NewListScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, informe o título da lista.');
      return;
    }

    // Format fallback date if blank
    const finalDate = date.trim() || new Date().toLocaleDateString('pt-BR');

    onAddList({
      title: title.trim(),
      description: description.trim(),
      date: finalDate,
      iconType: 'list' // default list icon
    });

    // Reset fields and redirect to dashboard
    setTitle('');
    setDescription('');
    setDate('');
    setScreen('inicio');
  };

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
        <span className="font-display text-lg font-bold tracking-tight text-white">
          Nova Lista
        </span>
        <div className="flex h-10 w-12 items-center justify-center rounded bg-[#1e242e] text-[10px] uppercase tracking-wider text-brand-text-muted font-bold">
          img
        </div>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-6">
        {/* Title fields - exact layout matching screenshot with rounded white input styling */}
        <div className="space-y-2">
          <label className="block text-xs text-brand-text-muted font-medium ml-1">
            titulo
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Mercado semanal"
            className="w-full h-12 rounded-lg bg-white px-4 font-sans text-black placeholder-gray-500 outline-none border border-[#23272e] transition-all focus:ring-2 focus:ring-brand-primary"
          />
        </div>

        {/* Description field */}
        <div className="space-y-2">
          <label className="block text-xs text-brand-text-muted font-medium ml-1">
            descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adicione uma breve descrição..."
            rows={5}
            className="w-full rounded-lg border border-[#23272e] bg-[#121418] p-4 text-sm text-white placeholder-gray-600 outline-none resize-none focus:border-brand-primary transition-colors"
          />
        </div>

        {/* Date Field - exact layout matching screenshot with white background and formatted values */}
        <div className="space-y-2">
          <label className="block text-xs text-brand-text-muted font-medium ml-1">
            Data:
          </label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="00/00/0000"
            className="w-full h-12 rounded-lg bg-white px-4 font-sans text-black placeholder-gray-500 outline-none border border-[#23272e] transition-all focus:ring-2 focus:ring-brand-primary"
            onFocus={(e) => {
              // Convert text helper placeholder into interactive picker
              if (e.target.value === '') { e.target.type = 'date'; }
            }}
            onBlur={(e) => {
              if (e.target.value === '') { e.target.type = 'text'; }
            }}
          />
        </div>

        {/* Form Action buttons */}
        <div className="space-y-3 pt-6">
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-brand-primary text-sm font-semibold tracking-wide text-white transition-all hover:bg-brand-primary-hover active:scale-[0.98] flex items-center justify-center shadow-lg shadow-brand-primary/20"
          >
            Criar
          </button>
          <button
            type="button"
            onClick={() => setScreen('inicio')}
            className="w-full h-12 rounded-lg border border-[#23272e] bg-[#121418] text-sm font-bold tracking-wider text-white transition-all hover:bg-[#1c2128] active:scale-[0.98] uppercase"
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
  );
}
