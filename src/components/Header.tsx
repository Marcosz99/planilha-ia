import { Course } from '../lib/supabase';

interface HeaderProps {
  course: Course;
  progressPercentage: number;
}

export default function Header({ course, progressPercentage }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
              {course.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Seu Progresso
            </span>
            <span className="text-sm font-bold" style={{ color: course.theme_color }}>
              {progressPercentage}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: course.theme_color,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
