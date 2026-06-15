import { LogIn, Home, PlusCircle, BarChart3 } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, setScreen }: BottomNavProps) {
  const tabs = [
    {
      id: 'login' as Screen,
      label: 'login',
      icon: LogIn,
    },
    {
      id: 'inicio' as Screen,
      label: 'início',
      icon: Home,
    },
    {
      id: 'add' as Screen,
      label: 'add',
      icon: PlusCircle,
      isSpecial: true,
    },
    {
      id: 'produtividade' as Screen,
      label: 'produtividade',
      icon: BarChart3,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1f242e] bg-[#0e1114]/90 backdrop-blur-md py-3 px-6 pb-5">
      <div className="mx-auto flex max-w-md items-center justify-between">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = currentScreen === tab.id || (tab.id === 'produtividade' && currentScreen === 'inicio'); // highlight produtividade if requested or simply active dashboard visual

          const isReallyActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                // If clicking produtividade, let's route to inicio because produtividade is a section of the dashboard,
                // or we can scroll to it nicely, or set it as active on dashboard!
                if (tab.id === 'produtividade') {
                  setScreen('inicio');
                  // We can dispatch a scroll or simply show a modal - we will also make the dashboard scroll down to charts!
                  setTimeout(() => {
                    const chartElement = document.getElementById('productivity-section');
                    if (chartElement) {
                      chartElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                } else {
                  setScreen(tab.id);
                }
              }}
              className="flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95"
              style={{ width: '22%' }}
            >
              {tab.isSpecial ? (
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                    isReallyActive
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30'
                      : 'bg-[#1c2128] text-brand-text-muted hover:text-white'
                  }`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
              ) : (
                <IconComponent
                  className={`h-5 w-5 transition-colors duration-300 ${
                    isReallyActive ? 'text-brand-primary' : 'text-brand-text-muted hover:text-white'
                  }`}
                />
              )}
              <span
                className={`font-sans text-[11px] font-medium tracking-wide transition-colors duration-300 ${
                  isReallyActive ? 'text-brand-primary font-semibold' : 'text-brand-text-muted'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
