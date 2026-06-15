export type Screen = 'login' | 'forgot' | 'reset' | 'inicio' | 'add' | 'edit' | 'produtividade';

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskList {
  id: string;
  title: string;
  description: string;
  date: string;
  itemCount: number;
  completed: boolean;
  iconType: 'shopping-cart' | 'briefcase' | 'list' | 'calendar';
  tasks: TaskItem[];
}

export interface ProductivityDay {
  day: string; // 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom'
  label: string;
  completedCount: number;
  targetCount: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  joinedDate: string;
}
