/*
  # Update Module 2 name and Create Module 3

  1. Updates
    - Rename Module 2 to "Módulo 2: Download da Planilha Provisória"
  
  2. New Tables
    - Add Module 3 with two locked lessons:
      - "Chave de ativacao definitiva"
      - "Bonus planilha comparativa renda fixa"

  3. Notes
    - Lessons are marked with Lock icon and content indicating they are blocked
*/

UPDATE modules
SET title = 'Módulo 2: Download da Planilha Provisória'
WHERE order_index = 2;

INSERT INTO modules (course_id, title, order_index, created_at)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Módulo 3: Conteúdo Premium',
  3,
  now()
);

INSERT INTO lessons (module_id, title, content_type, content_url, content_text, icon, order_index, created_at)
SELECT 
  m.id,
  'Chave de ativacao definitiva',
  'text',
  NULL,
  'Este conteúdo está bloqueado. Utilize sua chave de ativação para desbloquear.',
  'Lock',
  1,
  now()
FROM modules m
WHERE m.order_index = 3
UNION ALL
SELECT 
  m.id,
  'Bonus planilha comparativa renda fixa',
  'text',
  NULL,
  'Este conteúdo está bloqueado. Utilize sua chave de ativação para desbloquear.',
  'Lock',
  2,
  now()
FROM modules m
WHERE m.order_index = 3;
