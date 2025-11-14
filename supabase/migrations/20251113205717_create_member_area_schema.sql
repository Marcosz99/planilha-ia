/*
  # Create Member Area Schema

  ## Overview
  This migration creates the database structure for a member area platform featuring courses, modules, lessons, and user progress tracking.

  ## New Tables
  
  ### `courses`
  - `id` (uuid, primary key) - Unique course identifier
  - `title` (text) - Course title
  - `subtitle` (text) - Welcome message/description
  - `theme_color` (text) - Primary theme color (e.g., '#10B981' for mint green)
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `modules`
  - `id` (uuid, primary key) - Unique module identifier
  - `course_id` (uuid, foreign key) - Reference to parent course
  - `title` (text) - Module title
  - `order_index` (integer) - Display order within course
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `lessons`
  - `id` (uuid, primary key) - Unique lesson identifier
  - `module_id` (uuid, foreign key) - Reference to parent module
  - `title` (text) - Lesson title
  - `content_type` (text) - Type: 'video', 'download', 'pdf', 'text'
  - `content_url` (text, nullable) - External URL or file path
  - `content_text` (text, nullable) - Text content for text-based lessons
  - `icon` (text) - Icon name for display
  - `order_index` (integer) - Display order within module
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `user_progress`
  - `id` (uuid, primary key) - Unique progress record identifier
  - `user_id` (uuid) - Reference to auth.users
  - `lesson_id` (uuid, foreign key) - Reference to lesson
  - `completed` (boolean) - Completion status
  - `completed_at` (timestamptz, nullable) - Completion timestamp
  - `created_at` (timestamptz) - Creation timestamp
  
  ## Security
  - Enable RLS on all tables
  - Allow authenticated users to read all courses, modules, and lessons
  - Allow authenticated users to manage their own progress records
  - Prevent users from accessing other users' progress data
  
  ## Important Notes
  1. All tables use UUID primary keys for better scalability
  2. Order indices allow flexible content organization
  3. Progress tracking is per-user and per-lesson
  4. Content can be external URLs or stored text
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  theme_color text DEFAULT '#10B981',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content_type text NOT NULL,
  content_url text,
  content_text text,
  icon text DEFAULT 'FileText',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view modules"
  ON modules FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  USING (true);

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress"
  ON user_progress FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);