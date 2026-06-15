import { TaskList, ProductivityDay, UserProfile } from './types';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Johnston',
  email: 'seuemail@exemplo.com',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
  joinedDate: 'Agosto 2023'
};

export const INITIAL_LISTS: TaskList[] = [
  {
    id: 'list-1',
    title: 'Lista - Supermercado',
    description: 'Frutas, legumes, arroz, feijão, leite condensado e suprimentos de cozinha semanais.',
    date: '27/08/2026',
    itemCount: 12,
    completed: false,
    iconType: 'shopping-cart',
    tasks: [
      { id: 't-1', text: 'Arroz 5kg', completed: true },
      { id: 't-2', text: 'Feijão Carioca', completed: true },
      { id: 't-3', text: 'Leite Condensado (3 caixas)', completed: false },
      { id: 't-4', text: 'Banana Prata (1 dúzia)', completed: false },
      { id: 't-5', text: 'Maçãs Gala', completed: true },
      { id: 't-6', text: 'Sabonete líquido', completed: true },
      { id: 't-7', text: 'Papel higiênico 12 rolos', completed: false },
      { id: 't-8', text: 'Detergente para louça', completed: false },
      { id: 't-9', text: 'Ovos brancos (30 unidades)', completed: true },
      { id: 't-10', text: 'Pão de Forma', completed: false },
      { id: 't-11', text: 'Manteiga com sal', completed: false },
      { id: 't-12', text: 'Iogurte natural', completed: false }
    ]
  },
  {
    id: 'list-2',
    title: 'Lista - Afazeres',
    description: 'Tarefas rotineiras de manutenção doméstica e estudos organizadas.',
    date: '23/08/2026',
    itemCount: 5,
    completed: true,
    iconType: 'briefcase',
    tasks: [
      { id: 't-13', text: 'Enviar relatório financeiro', completed: true },
      { id: 't-14', text: 'Estudar 2 horas de TypeScript', completed: true },
      { id: 't-15', text: 'Organizar gavetas do escritório', completed: true },
      { id: 't-16', text: 'Pagar conta de energia elétrica', completed: true },
      { id: 't-17', text: 'Fazer backup do notebook', completed: true }
    ]
  },
  {
    id: 'list-3',
    title: 'Lista - Compras Mensais',
    description: 'Reposição de itens de dispensa, higiene e limpeza para o mês de Dezembro.',
    date: '01/12/2026',
    itemCount: 20,
    completed: false,
    iconType: 'list',
    tasks: [
      { id: 't-18', text: 'Desinfetante eucalipto', completed: false },
      { id: 't-19', text: 'Amaciante de roupas concentrado', completed: false },
      { id: 't-20', text: 'Sabão em pó 2kg', completed: true },
      { id: 't-21', text: 'Creme dental branqueador', completed: false },
      { id: 't-22', text: 'Shampoo anticaspa', completed: true }
    ]
  }
];

export const INITIAL_PRODUCTIVITY_DAYS: ProductivityDay[] = [
  { day: 'seg', label: 'Seg', completedCount: 6, targetCount: 8 },
  { day: 'ter', label: 'Ter', completedCount: 7, targetCount: 8 },
  { day: 'qua', label: 'Qua', completedCount: 5, targetCount: 8 },
  { day: 'qui', label: 'Qui', completedCount: 8, targetCount: 8 },
  { day: 'sex', label: 'Sex', completedCount: 4, targetCount: 8 },
  { day: 'sab', label: 'Sáb', completedCount: 2, targetCount: 4 },
  { day: 'dom', label: 'Dom', completedCount: 3, targetCount: 4 }
];
