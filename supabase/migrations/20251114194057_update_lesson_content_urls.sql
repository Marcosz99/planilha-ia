/*
  # Update Lesson Content URLs

  1. Updates
    - Update video lesson with YouTube embed URL
    - Update Windows Excel download link
    - Update Mac Excel download link
  
  2. Notes
    - Sets proper YouTube embed URL for the tutorial video
    - Points download links to public folder files
*/

UPDATE lessons
SET content_url = 'https://www.youtube.com/embed/AWdExwMu7OM'
WHERE title = 'Como instalar e configurar'
AND content_type = 'video';

UPDATE lessons
SET content_url = '/Windows-Planilha2025.xlsm'
WHERE title = 'Planilha para Windows'
AND content_type = 'download';

UPDATE lessons
SET content_url = '/macOS-Controle-Financeiro-2025.xlsm'
WHERE title = 'Planilha para Mac'
AND content_type = 'download';
