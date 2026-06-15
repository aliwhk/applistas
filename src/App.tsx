/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, TaskList, UserProfile } from './types';
import { INITIAL_LISTS, INITIAL_USER } from './initialData';

// Modular Component Imports
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import DashboardScreen from './components/DashboardScreen';
import NewListScreen from './components/NewListScreen';
import EditListScreen from './components/EditListScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentScreen, setScreen] = useState<Screen>('login');
  const [lists, setLists] = useState<TaskList[]>([]);
  const [selectedListForEdit, setSelectedListForEdit] = useState<TaskList | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER);

  // Load from localStorage or seed initial data
  useEffect(() => {
    const savedLists = localStorage.getItem('taskflow_lists');
    if (savedLists) {
      try {
        setLists(JSON.parse(savedLists));
      } catch (e) {
        setLists(INITIAL_LISTS);
      }
    } else {
      setLists(INITIAL_LISTS);
    }

    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (e) {
        setUserProfile(INITIAL_USER);
      }
    }
  }, []);

  // Save updates to localStorage
  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem('taskflow_lists', JSON.stringify(lists));
    }
  }, [lists]);

  // Handle successful login
  const handleLoginSuccess = (email: string) => {
    const updatedUser = {
      ...userProfile,
      email: email,
    };
    setUserProfile(updatedUser);
    localStorage.setItem('taskflow_user', JSON.stringify(updatedUser));
  };

  // Add new list of tasks
  const handleAddList = (newListData: Omit<TaskList, 'id' | 'completed' | 'itemCount' | 'tasks'>) => {
    const newList: TaskList = {
      ...newListData,
      id: `list-${Date.now()}`,
      completed: false,
      itemCount: 0,
      tasks: [], // Starts with clean subtasks setup
    };
    setLists((prev) => [newList, ...prev]);
  };

  // Edit list metadata
  const handleUpdateList = (updatedList: TaskList) => {
    setLists((prev) => prev.map((l) => (l.id === updatedList.id ? updatedList : l)));
  };

  // Handle password change simulation
  const handlePasswordChanged = () => {
    // Notify or update credentials state
    console.log('Password successfully reset in simulation mode.');
  };

  // Render current active screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            setScreen={setScreen}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'forgot':
        return (
          <ForgotPasswordScreen
            setScreen={setScreen}
            onSubmitEmail={(email) => {
              const updatedUser = { ...userProfile, email };
              setUserProfile(updatedUser);
            }}
          />
        );
      case 'reset':
        return (
          <ChangePasswordScreen
            setScreen={setScreen}
            onPasswordChanged={handlePasswordChanged}
          />
        );
      case 'inicio':
        return (
          <DashboardScreen
            lists={lists}
            setLists={setLists}
            setScreen={setScreen}
            setSelectedListForEdit={setSelectedListForEdit}
            userEmail={userProfile.email}
          />
        );
      case 'add':
        return (
          <NewListScreen
            setScreen={setScreen}
            onAddList={handleAddList}
          />
        );
      case 'edit':
        return (
          <EditListScreen
            list={selectedListForEdit}
            setScreen={setScreen}
            onUpdateList={handleUpdateList}
            userProfile={userProfile}
          />
        );
      default:
        return (
          <DashboardScreen
            lists={lists}
            setLists={setLists}
            setScreen={setScreen}
            setSelectedListForEdit={setSelectedListForEdit}
            userEmail={userProfile.email}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0e1114] text-gray-100 flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Animated Viewport frame simulation */}
      <div className="flex-1 w-full pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent global Bottom Nav bar */}
      <BottomNav currentScreen={currentScreen} setScreen={setScreen} />

      {/* Responsive frame bounds helper for Desktop browsers */}
      <div className="hidden lg:flex fixed top-4 right-4 z-40 bg-brand-card/95 border border-[#23272e] rounded-xl p-4 max-w-xs flex-col gap-2 shadow-2xl">
        <h4 className="text-xs font-bold font-display text-white tracking-wider uppercase mb-1">
          Configurador do Protótipo
        </h4>
        <p className="text-[11px] text-brand-text-muted leading-relaxed">
          Para simular as telas exatamente como no telemóvel / mobile, você pode clicar nos botões da barra inferior a qualquer instante!
        </p>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#1e242e]">
          <button
            onClick={() => setScreen('login')}
            className={`px-2 py-1 rounded text-[10px] font-semibold tracking-wider transition ${
              currentScreen === 'login' ? 'bg-brand-primary text-white' : 'bg-[#1b1e24] text-brand-text-muted hover:text-white'
            }`}
          >
            1. Login
          </button>
          <button
            onClick={() => setScreen('forgot')}
            className={`px-2 py-1 rounded text-[10px] font-semibold tracking-wider transition ${
              currentScreen === 'forgot' ? 'bg-brand-primary text-white' : 'bg-[#1b1e24] text-brand-text-muted hover:text-white'
            }`}
          >
            2. Esqueci Senha
          </button>
          <button
            onClick={() => setScreen('reset')}
            className={`px-2 py-1 rounded text-[10px] font-semibold tracking-wider transition ${
              currentScreen === 'reset' ? 'bg-brand-primary text-white' : 'bg-[#1b1e24] text-brand-text-muted hover:text-white'
            }`}
          >
            3. Alterar Senha
          </button>
          <button
            onClick={() => setScreen('inicio')}
            className={`px-2 py-1 rounded text-[10px] font-semibold tracking-wider transition ${
              currentScreen === 'inicio' ? 'bg-brand-primary text-white' : 'bg-[#1b1e24] text-brand-text-muted hover:text-white'
            }`}
          >
            4. Gerenciador
          </button>
          <button
            onClick={() => setScreen('add')}
            className={`px-2 py-1 rounded text-[10px] font-semibold tracking-wider transition ${
              currentScreen === 'add' ? 'bg-brand-primary text-white' : 'bg-[#1b1e24] text-brand-text-muted hover:text-white'
            }`}
          >
            5. Nova Lista
          </button>
        </div>
      </div>
    </div>
  );
}
