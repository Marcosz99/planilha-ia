/*
  # Add All Modules and Video Lessons

  1. New Modules
    - Módulo 1: Tutorial de Instalação (update)
    - Módulo 2: Download da Planilha Provisória (already exists)
    - Módulo 3: Conteúdo Premium (already exists)
    - Módulo 4: Como Usar a Planilha Completa (new)

  2. New Lessons
    - Module 1: Guia Resumo (video)
    - Module 3: Bônus — Planilha Comparativa Renda Fixa (video)
    - Module 4: Multiple video lessons
      - Compreendendo os Gráficos
      - Alterar Nome na Planilha
      - Cadastrar Despesas Fixas
      - Cadastrar Investimentos
      - Cadastrar Despesas Variáveis
      - Métodos de Pagamento
      - Inserir Data de Vencimento
      - Guia Dados — Planilha Desbloqueada
      - Relatório IA
      - Importar Fatura/Extrato
      - Compras Parceladas

  3. Notes
    - All videos use YouTube embed URLs with proper parameters
    - Videos use the standard responsive iframe container format
*/

DO $$
DECLARE
  v_course_id uuid := 'a0000000-0000-0000-0000-000000000001';
  v_module1_id uuid := 'b0000000-0000-0000-0000-000000000001';
  v_module2_id uuid := 'b0000000-0000-0000-0000-000000000002';
  v_module3_id uuid;
  v_module4_id uuid;
BEGIN
  -- Get Module 3 ID
  SELECT id INTO v_module3_id FROM modules WHERE title = 'Módulo 3: Conteúdo Premium' LIMIT 1;

  -- Create Module 4 if it doesn't exist
  INSERT INTO modules (course_id, title, order_index, created_at)
  VALUES (v_course_id, 'Módulo 4: Como Usar a Planilha Completa', 4, now())
  ON CONFLICT DO NOTHING
  RETURNING id INTO v_module4_id;

  -- Get Module 4 ID if it already existed
  IF v_module4_id IS NULL THEN
    SELECT id INTO v_module4_id FROM modules WHERE title = 'Módulo 4: Como Usar a Planilha Completa' LIMIT 1;
  END IF;

  -- Add "Guia Resumo" to Module 1
  INSERT INTO lessons (module_id, title, content_type, content_url, icon, order_index, created_at)
  VALUES (v_module1_id, 'Guia Resumo', 'video', 'https://www.youtube.com/embed/JFU64pFHx3o?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 2, now())
  ON CONFLICT DO NOTHING;

  -- Add "Bônus — Planilha Comparativa Renda Fixa" to Module 3
  UPDATE lessons
  SET content_url = 'https://www.youtube.com/embed/WzvEJud2-_g?rel=0&modestbranding=1&showinfo=0&controls=1',
      content_type = 'video'
  WHERE module_id = v_module3_id AND title = 'Bonus planilha comparativa renda fixa';

  -- Add all Module 4 video lessons
  INSERT INTO lessons (module_id, title, content_type, content_url, icon, order_index, created_at)
  VALUES
    (v_module4_id, 'Compreendendo os Gráficos', 'video', 'https://www.youtube.com/embed/Jooh9qmQE74?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 1, now()),
    (v_module4_id, 'Alterar Nome na Planilha', 'video', 'https://www.youtube.com/embed/38-Hlc7qSxM?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 2, now()),
    (v_module4_id, 'Cadastrar Despesas Fixas', 'video', 'https://www.youtube.com/embed/9bJBiUqGvQM?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 3, now()),
    (v_module4_id, 'Cadastrar Investimentos', 'video', 'https://www.youtube.com/embed/UfEBsAWCjM4?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 4, now()),
    (v_module4_id, 'Cadastrar Despesas Variáveis', 'video', 'https://www.youtube.com/embed/m9kLaxNojv0?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 5, now()),
    (v_module4_id, 'Métodos de Pagamento', 'video', 'https://www.youtube.com/embed/tD8k27BOdlI?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 6, now()),
    (v_module4_id, 'Inserir Data de Vencimento', 'video', 'https://www.youtube.com/embed/-G_YH6pZCMQ?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 7, now()),
    (v_module4_id, 'Guia Dados — Planilha Desbloqueada', 'video', 'https://www.youtube.com/embed/TbwkvF0bpzY?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 8, now()),
    (v_module4_id, 'Relatório IA', 'video', 'https://www.youtube.com/embed/lokq8xEzf0c?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 9, now()),
    (v_module4_id, 'Importar Fatura/Extrato', 'video', 'https://www.youtube.com/embed/vRuW0brVnrI?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 10, now()),
    (v_module4_id, 'Compras Parceladas', 'video', 'https://www.youtube.com/embed/0rtM9XoS9qw?rel=0&modestbranding=1&showinfo=0&controls=1', 'Video', 11, now())
  ON CONFLICT DO NOTHING;
END $$;
