import React, { useState } from 'react';
import {
  Menu,
  SlidersHorizontal,
  MoreVertical,
  ShoppingCart,
  Briefcase,
  ListTodo,
  Calendar,
  Check,
  PlusCircle,
  Eye,
  Trash2,
  Edit,
  X,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { TaskList, Screen, ProductivityDay } from '../types';
import { INITIAL_PRODUCTIVITY_DAYS } from '../initialData';

interface DashboardScreenProps {
  lists: TaskList[];
  setLists: React.Dispatch<React.SetStateAction<TaskList[]>>;
  setScreen: (screen: Screen) => void;
  setSelectedListForEdit: (list: TaskList) => void;
  userEmail: string;
}

export default function DashboardScreen({
  lists,
  setLists,
  setScreen,
  setSelectedListForEdit,
  userEmail
}: DashboardScreenProps) {
  const [filterActive, setFilterActive] = useState<'todos' | 'completos' | 'pendentes'>('todos');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedListDetail, setSelectedListDetail] = useState<TaskList | null>(null);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // Toggle list completion directly from the main view
  const toggleListCompleted = (listId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // don't open details modal
    setLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          const nextCompleted = !list.completed;
          // When completing a list, optionally complete all its subtasks too
          const updatedTasks = list.tasks.map((task) => ({
            ...task,
            completed: nextCompleted
          }));
          return {
            ...list,
            completed: nextCompleted,
            tasks: updatedTasks
          };
        }
        return list;
      })
    );
  };

  // Toggle individual task within a list details modal
  const toggleSubTask = (listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          const updatedTasks = list.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
          );
          // Recalculate completed status: if all subtasks are complete, list is complete
          const allCompleted = updatedTasks.length > 0 && updatedTasks.every((t) => t.completed);
          
          const updatedList = {
            ...list,
            tasks: updatedTasks,
            completed: allCompleted
          };

          // If this is currently opened in detail, update the detail view state
          if (selectedListDetail && selectedListDetail.id === listId) {
            setSelectedListDetail(updatedList);
          }

          return updatedList;
        }
        return list;
      })
    );
  };

  // Add a new quick subtask in detail view
  const [newSubTaskText, setNewSubTaskText] = useState('');
  const handleAddSubTask = (listId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubTaskText.trim()) return;

    setLists((prev) =>
      prev.map((list) => {
        if (list.id === listId) {
          const newTask = {
            id: `sub-${Date.now()}`,
            text: newSubTaskText.trim(),
            completed: false
          };
          const updatedList = {
            ...list,
            tasks: [...list.tasks, newTask],
            itemCount: list.itemCount + 1,
            completed: false // adding pending item means list is no longer completed
          };

          if (selectedListDetail && selectedListDetail.id === listId) {
            setSelectedListDetail(updatedList);
          }

          return updatedList;
        }
        return list;
      })
    );
    setNewSubTaskText('');
  };

  // Delete a list
  const handleDeleteList = (listId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza de que deseja deletar esta lista?')) {
      setLists((prev) => prev.filter((item) => item.id !== listId));
      setActiveDropdownId(null);
    }
  };

  // Trigger edit list screen
  const handleEditList = (list: TaskList, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedListForEdit(list);
    setScreen('edit');
    setActiveDropdownId(null);
  };

  // Calculate dynamic productivity percentage
  const totalSubtasks = lists.reduce((acc, list) => acc + list.tasks.length, 0);
  const completedSubtasks = lists.reduce(
    (acc, list) => acc + list.tasks.filter((t) => t.completed).length,
    0
  );
  const dynamicPercentage =
    totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Render list icon helper
  const renderListIcon = (type: string) => {
    const classes = 'h-5 w-5 text-gray-300';
    switch (type) {
      case 'shopping-cart':
        return <ShoppingCart className={classes} />;
      case 'briefcase':
        return <Briefcase className={classes} />;
      default:
        return <ListTodo className={classes} />;
    }
  };

  // Filter lists
  const filteredLists = lists.filter((list) => {
    if (filterActive === 'completos') return list.completed;
    if (filterActive === 'pendentes') return !list.completed;
    return true;
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[#0e1114] px-5 pt-6 pb-24 text-gray-100">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#23272e] bg-[#121418] hover:bg-[#1a1e24] cursor-pointer">
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-6 w-9 items-center justify-center rounded bg-[#1e242e] text-[9px] uppercase tracking-wider text-brand-text-muted font-bold">
            img
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-white">Gerenciador</span>
        </div>

        <div
          onClick={() => setScreen('login')}
          className="h-10 w-10 overflow-hidden rounded-full border border-brand-primary bg-[#121418] cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
            alt="User profile"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Productivity Card Section */}
      <div id="productivity-section" className="mb-6 rounded-xl border border-[#23272e] bg-[#15181c] p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-white">Produtividade</h3>
            <span className="text-[10px] font-bold tracking-wider text-brand-text-muted uppercase">
              SEMANA ATUAL
            </span>
          </div>
          <div className="text-right">
            <span className="font-display text-3xl font-black text-brand-primary">
              {dynamicPercentage}%
            </span>
            <span className="block text-[10px] font-bold tracking-wider text-brand-text-muted uppercase">
              CONCLUÍDO
            </span>
          </div>
        </div>

        {/* Bar Chart representing Portuguese weekdays - fully reactive bar heights */}
        <div className="mt-6 flex items-end justify-between px-1 h-32">
          {INITIAL_PRODUCTIVITY_DAYS.map((item, index) => {
            // Incorporate currently checked things to make the chart feel reactive on the current day
            const isToday = index === 2; // Simulation: Wednesday 'qua' is today
            const effectiveCompleted = isToday
              ? Math.max(item.completedCount, completedSubtasks)
              : item.completedCount;
            const percentage = Math.min(
              100,
              Math.max(12, Math.round((effectiveCompleted / item.targetCount) * 100))
            );

            return (
              <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                <div className="relative w-[34%] h-24 rounded-t bg-[#1d222b] overflow-hidden flex flex-col justify-end">
                  {/* Dynamic filled tracking bar */}
                  <div
                    className={`w-full rounded-t transition-all duration-700 ease-out ${
                      isToday ? 'bg-brand-primary' : 'bg-[#3b35be]'
                    }`}
                    style={{ height: `${percentage}%` }}
                  >
                    {/* Tiny animated indicator glow inside bar */}
                    {isToday && <div className="h-1 w-full bg-white opacity-40 animate-pulse" />}
                  </div>
                </div>
                <span
                  className={`font-mono text-[10px] uppercase font-bold tracking-wider ${
                    isToday ? 'text-brand-primary font-boldScale' : 'text-brand-text-muted'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly highlight card */}
      <div className="mb-6 rounded-xl bg-[#4c42e9] p-5 text-white shadow-lg shadow-brand-primary/20">
        <span className="text-[10px] font-extrabold tracking-widest text-[#cfcbff] uppercase">
          DESTAQUE DO MÊS
        </span>
        <h2 className="font-display text-2xl font-extrabold mt-1 mb-2">Novembro</h2>
        <div className="w-10 h-0.5 bg-[#cfcbff]/60 mb-3" />
        <p className="font-sans text-xs text-[#ebd8ff]/90 leading-relaxed mb-4">
          Você completou 148 tarefas este mês. É o seu melhor desempenho até agora!
        </p>
        <button
          onClick={() => setShowStatsModal(true)}
          className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xs font-bold text-brand-primary transition-all hover:bg-opacity-90 active:scale-95"
        >
          Ver Detalhes
        </button>
      </div>

      {/* List Header Filter */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-sm font-extrabold tracking-widest text-brand-text-muted uppercase">
          LISTAS ({filteredLists.length})
        </span>

        <div className="relative">
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="flex items-center gap-2 rounded-lg border border-[#23272e] bg-[#121418] px-3 py-1.5 text-xs text-brand-text-muted transition-colors hover:text-white"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-brand-primary" />
            <span className="capitalize">{filterActive === 'todos' ? 'FILTRO' : filterActive}</span>
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-lg border border-[#23272e] bg-[#15181c] shadow-xl z-20">
              {(['todos', 'completos', 'pendentes'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setFilterActive(mode);
                    setShowFilterDropdown(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-xs capitalize transition-colors ${
                    filterActive === mode ? 'bg-brand-primary text-white font-semibold' : 'text-brand-text-muted hover:bg-[#1c2128]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task lists container */}
      <div className="space-y-3 flex-1">
        {filteredLists.length === 0 ? (
          <div className="rounded-xl border border-[#23272e] py-12 text-center">
            <ListTodo className="mx-auto h-10 w-10 text-gray-700 mb-3" />
            <p className="text-xs text-brand-text-muted">Nenhuma lista encontrada para este filtro.</p>
            <button
              onClick={() => setScreen('add')}
              className="mt-3 text-xs text-brand-primary font-bold hover:underline"
            >
              Criar nova lista
            </button>
          </div>
        ) : (
          filteredLists.map((list) => (
            <div
              key={list.id}
              onClick={() => setSelectedListDetail(list)}
              className="group relative flex items-center justify-between rounded-xl border border-[#23272e] bg-[#15181c] p-4 transition-all hover:bg-[#1a1e24] cursor-pointer"
            >
              {/* Left detail area */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1c2128] border border-[#2c3340] group-hover:border-brand-primary transition-colors">
                  {renderListIcon(list.iconType)}
                </div>
                <div>
                  <h4
                    className={`font-sans text-sm font-bold text-white leading-snug group-hover:text-brand-primary transition-colors ${
                      list.completed ? 'line-through text-opacity-50' : ''
                    }`}
                  >
                    {list.title}
                  </h4>
                  <span className="font-mono text-[10px] text-brand-text-muted">
                    {list.date} • {list.tasks.length} itens ({list.tasks.filter((t) => t.completed).length} concluídos)
                  </span>
                </div>
              </div>

              {/* Right controls area */}
              <div className="flex items-center gap-3">
                {/* Custom circular checkbox */}
                <button
                  type="button"
                  onClick={(e) => toggleListCompleted(list.id, e)}
                  className={`flex h-6 w-6 items-center justify-center rounded border transition-all duration-300 ${
                    list.completed
                      ? 'bg-brand-primary border-brand-primary text-white'
                      : 'border-[#333d4d] hover:border-brand-primary bg-transparent text-transparent'
                  }`}
                >
                  <Check className="h-4 w-4 stroke-[2.5]" />
                </button>

                {/* Vertical menu dots */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdownId(activeDropdownId === list.id ? null : list.id);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#252c38] text-brand-text-muted transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Dropdown Options overlay */}
                  {activeDropdownId === list.id && (
                    <div className="absolute right-0 mt-1 w-32 overflow-hidden rounded-lg border border-[#2c3340] bg-[#1a1e24] shadow-2xl z-30">
                      <button
                        onClick={(e) => handleEditList(list, e)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-brand-text hover:bg-brand-primary/20 transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5 text-[#a39eff]" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteList(list.id, e)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-400 hover:bg-red-950/40 border-t border-[#2c3340] transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Deletar</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Subtask Drill-Down Details Modal Backdrop */}
      {selectedListDetail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-t-2xl border border-[#23272e] bg-[#121418] p-5 pb-8 shadow-2xl animate-in slide-in-from-bottom border-b-0">
            {/* Modal Drag handle visual and Close button */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#23272e]">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1e242e] text-brand-primary">
                  {renderListIcon(selectedListDetail.iconType)}
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-white">
                    {selectedListDetail.title}
                  </h3>
                  <p className="text-[10px] text-brand-text-muted uppercase tracking-wider font-semibold">
                    SUBTAREFAS DESTE MÊS
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedListDetail(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2027] hover:bg-[#282d38] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-brand-text-muted leading-relaxed mb-4 italic p-2 bg-[#181c22] rounded-lg">
              "{selectedListDetail.description || 'Nenhuma descrição fornecida.'}"
            </p>

            {/* In-modal interactive Checklist */}
            <div className="max-h-56 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-gray-800 pr-1">
              {selectedListDetail.tasks.length === 0 ? (
                <p className="text-xs text-center py-4 text-brand-text-muted">
                  Nenhuma subtarefa adicionada ainda.
                </p>
              ) : (
                selectedListDetail.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleSubTask(selectedListDetail.id, task.id)}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-[#1e242e] bg-[#171a21] hover:bg-[#1f242e] transition-colors cursor-pointer"
                  >
                    <span
                      className={`text-xs font-medium ${
                        task.completed ? 'line-through text-brand-text-muted text-opacity-50' : 'text-gray-100'
                      }`}
                    >
                      {task.text}
                    </span>
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                        task.completed
                          ? 'bg-brand-primary border-brand-primary text-white'
                          : 'border-gray-600 bg-transparent text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick entry for new subtasks within drawer */}
            <form
              onSubmit={(e) => handleAddSubTask(selectedListDetail.id, e)}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Nova subtarefa rápida..."
                value={newSubTaskText}
                onChange={(e) => setNewSubTaskText(e.target.value)}
                className="flex-1 h-9 rounded-lg border border-[#23272e] bg-[#1a1f26] px-3 text-xs outline-none focus:border-brand-primary"
              />
              <button
                type="submit"
                className="h-9 px-3 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-semibold flex items-center justify-center gap-1 active:scale-95"
              >
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Analytics Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-sm rounded-xl border border-[#23272e] bg-[#121418] p-5 shadow-2xl animate-in fade-in-50 zoom-in-95">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#23272e]">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-primary" />
                <h3 className="font-display font-extrabold text-sm text-white">
                  Detalhes de Desempenho
                </h3>
              </div>
              <button
                onClick={() => setShowStatsModal(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c2027]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-[#4c42e9]/10 border border-[#4c42e9]/30 p-4">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <span className="block text-[11px] font-bold text-yellow-500 uppercase tracking-wider">
                      Destaque de Novembro
                    </span>
                    <p className="text-xs text-gray-200">
                      Você registrou 148 conclusões! Superou seu recorde anterior de Outubro em 15%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg border border-[#23272e] p-3 bg-[#171b22]">
                  <span className="text-lg font-black text-brand-primary">12</span>
                  <span className="block text-[10px] text-brand-text-muted mt-1">Listas Criadas</span>
                </div>
                <div className="rounded-lg border border-[#23272e] p-3 bg-[#171b22]">
                  <span className="text-lg font-black text-green-400">148</span>
                  <span className="block text-[10px] text-brand-text-muted mt-1">Concluídas (Mês)</span>
                </div>
                <div className="rounded-lg border border-[#23272e] p-3 bg-[#171b22]">
                  <span className="text-lg font-black text-indigo-400">92%</span>
                  <span className="block text-[10px] text-brand-text-muted mt-1">Fidelidade na Data</span>
                </div>
                <div className="rounded-lg border border-[#23272e] p-3 bg-[#171b22]">
                  <span className="text-lg font-black text-pink-400">1.8h</span>
                  <span className="block text-[10px] text-brand-text-muted mt-1">Tempo Ganho / Dia</span>
                </div>
              </div>

              <p className="text-[11px] text-brand-text-muted leading-relaxed text-center italic">
                "O progresso individual é acumulado de pequenos esforços diários contínuos."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
