import { ModuleWithLessons, Lesson } from '../lib/data';
import { Check, Video, Download, FileText, Target, BarChart3, ChevronDown, Lock } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  modules: ModuleWithLessons[];
  selectedLesson: Lesson | null;
  completedLessons: Set<string>;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleComplete: (lessonId: string) => void;
  themeColor: string;
  isUnlocked: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Video,
  Download,
  FileText,
  Target,
  BarChart3,
  Lock,
};

export default function Sidebar({
  modules,
  selectedLesson,
  completedLessons,
  onSelectLesson,
  onToggleComplete,
  themeColor,
  isUnlocked,
}: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(modules.map(m => m.id))
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Conteúdo do Curso</h2>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {modules.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          const moduleCompletedCount = module.lessons.filter(l => completedLessons.has(l.id)).length;

          return (
            <div key={module.id} className="border-b border-gray-100 last:border-b-0">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                data-testid={`button-module-${module.order_index}`}
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: themeColor }}
                  >
                    {module.order_index}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {module.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {moduleCompletedCount} de {module.lessons.length} completo
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="bg-gray-50">
                  {module.lessons.map((lesson) => {
                    const isLocked = lesson.locked && !isUnlocked;
                    const Icon = isLocked ? Lock : (iconMap[lesson.icon] || FileText);
                    const isSelected = selectedLesson?.id === lesson.id;
                    const isCompleted = completedLessons.has(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border-l-4 ${
                          isSelected
                            ? 'bg-white border-l-4'
                            : 'border-transparent hover:bg-white/50'
                        } ${isLocked ? 'opacity-75' : ''}`}
                        style={isSelected ? { borderLeftColor: themeColor } : {}}
                        data-testid={`lesson-${lesson.id}`}
                      >
                        {!isLocked && (
                          <button
                            onClick={() => onToggleComplete(lesson.id)}
                            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isCompleted
                                ? 'border-transparent'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={isCompleted ? { backgroundColor: themeColor } : {}}
                            data-testid={`checkbox-lesson-${lesson.id}`}
                          >
                            {isCompleted && <Check className="w-3 h-3 text-white" />}
                          </button>
                        )}

                        {isLocked && (
                          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-amber-500" />
                          </div>
                        )}

                        <button
                          onClick={() => onSelectLesson(lesson)}
                          className="flex items-center gap-3 flex-1 text-left min-w-0"
                          data-testid={`button-lesson-${lesson.id}`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isLocked ? 'text-amber-500' : 'text-gray-400'}`} />
                          <span
                            className={`text-sm truncate ${
                              isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'
                            } ${isCompleted ? 'line-through opacity-75' : ''}`}
                          >
                            {lesson.title}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
