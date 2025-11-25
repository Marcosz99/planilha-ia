export interface Course {
  id: string;
  title: string;
  subtitle: string;
  theme_color: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content_type: 'video' | 'download' | 'pdf' | 'text' | 'locked';
  content_url: string | null;
  content_text: string | null;
  icon: string;
  order_index: number;
  locked?: boolean;
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export const course: Course = {
  id: 'course-1',
  title: 'Planilha Financeira IA',
  subtitle: 'Bem-vindo(a) ao seu curso completo de controle financeiro inteligente',
  theme_color: '#10B981',
};

export const modulesWithLessons: ModuleWithLessons[] = [
  {
    id: 'module-1',
    course_id: 'course-1',
    title: 'Módulo 1: Tutorial de Instalação',
    order_index: 1,
    lessons: [
      {
        id: 'lesson-1-1',
        module_id: 'module-1',
        title: 'Como instalar e configurar',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/AWdExwMu7OM?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 1,
      },
      {
        id: 'lesson-1-2',
        module_id: 'module-1',
        title: 'Guia Resumo',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/JFU64pFHx3o?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 2,
      },
    ],
  },
  {
    id: 'module-2',
    course_id: 'course-1',
    title: 'Módulo 2: Download da Planilha Provisória',
    order_index: 2,
    lessons: [
      {
        id: 'lesson-2-1',
        module_id: 'module-2',
        title: 'Planilha para Windows',
        content_type: 'download',
        content_url: 'https://drive.google.com/file/d/1r4AYpVcWx72lt-ji4pB4YOOm_Xe4QixP/view?usp=sharing',
        content_text: null,
        icon: 'Download',
        order_index: 1,
      },
      {
        id: 'lesson-2-2',
        module_id: 'module-2',
        title: 'Planilha para Mac',
        content_type: 'download',
        content_url: 'https://drive.google.com/file/d/14yairX6Ajx0R2HpvFIxqxZH-7GSNbtWm/view?usp=sharing',
        content_text: null,
        icon: 'Download',
        order_index: 2,
      },
    ],
  },
  {
    id: 'module-3',
    course_id: 'course-1',
    title: 'Módulo 3: Conteúdo Premium',
    order_index: 3,
    lessons: [
      {
        id: 'lesson-3-1',
        module_id: 'module-3',
        title: 'Chave de ativacao definitiva',
        content_type: 'locked',
        content_url: null,
        content_text: 'Este conteúdo está bloqueado. Utilize sua chave de ativação para desbloquear.',
        icon: 'Lock',
        order_index: 1,
        locked: true,
      },
      {
        id: 'lesson-3-2',
        module_id: 'module-3',
        title: 'Bonus planilha comparativa renda fixa',
        content_type: 'locked',
        content_url: null,
        content_text: 'Este conteúdo está bloqueado. Utilize sua chave de ativação para desbloquear.',
        icon: 'Lock',
        order_index: 2,
        locked: true,
      },
    ],
  },
  {
    id: 'module-4',
    course_id: 'course-1',
    title: 'Módulo 4: Como Usar a Planilha Completa',
    order_index: 4,
    lessons: [
      {
        id: 'lesson-4-1',
        module_id: 'module-4',
        title: 'Compreendendo os Gráficos',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/Jooh9qmQE74?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 1,
      },
      {
        id: 'lesson-4-2',
        module_id: 'module-4',
        title: 'Alterar Nome na Planilha',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/38-Hlc7qSxM?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 2,
      },
      {
        id: 'lesson-4-3',
        module_id: 'module-4',
        title: 'Cadastrar Despesas Fixas',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/9bJBiUqGvQM?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 3,
      },
      {
        id: 'lesson-4-4',
        module_id: 'module-4',
        title: 'Cadastrar Investimentos',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/UfEBsAWCjM4?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 4,
      },
      {
        id: 'lesson-4-5',
        module_id: 'module-4',
        title: 'Cadastrar Despesas Variáveis',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/m9kLaxNojv0?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 5,
      },
      {
        id: 'lesson-4-6',
        module_id: 'module-4',
        title: 'Métodos de Pagamento',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/tD8k27BOdlI?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 6,
      },
      {
        id: 'lesson-4-7',
        module_id: 'module-4',
        title: 'Inserir Data de Vencimento',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/-G_YH6pZCMQ?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 7,
      },
      {
        id: 'lesson-4-8',
        module_id: 'module-4',
        title: 'Guia Dados — Planilha Desbloqueada',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/TbwkvF0bpzY?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 8,
      },
      {
        id: 'lesson-4-9',
        module_id: 'module-4',
        title: 'Relatório IA',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/lokq8xEzf0c?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 9,
      },
      {
        id: 'lesson-4-10',
        module_id: 'module-4',
        title: 'Importar Fatura/Extrato',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/vRuW0brVnrI?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 10,
      },
      {
        id: 'lesson-4-11',
        module_id: 'module-4',
        title: 'Compras Parceladas',
        content_type: 'video',
        content_url: 'https://www.youtube.com/embed/0rtM9XoS9qw?rel=0&modestbranding=1&showinfo=0&controls=1',
        content_text: null,
        icon: 'Video',
        order_index: 11,
      },
    ],
  },
];

export const UNLOCK_KEY = 'kgF309!xPU@';
export const LOGIN_EMAIL = 'financeiro@planilha2000';
export const LOGIN_PASSWORD = 'financeiro155';
