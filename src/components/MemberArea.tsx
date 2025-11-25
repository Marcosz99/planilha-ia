import { useState, useEffect } from 'react';
import { course, modulesWithLessons, Lesson, ModuleWithLessons, UNLOCK_KEY } from '../lib/data';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import Header from './Header';
import WhatsAppButton from './WhatsAppButton';
import UnlockModal from './UnlockModal';

interface MemberAreaProps {
  onLogout: () => void;
}

export default function MemberArea({ onLogout }: MemberAreaProps) {
  const [modules, setModules] = useState<ModuleWithLessons[]>(modulesWithLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem('contentUnlocked') === 'true';
    setIsUnlocked(unlocked);
    
    if (unlocked) {
      unlockContent();
    }

    if (modules.length > 0 && modules[0].lessons.length > 0) {
      setSelectedLesson(modules[0].lessons[0]);
    }

    const savedProgress = localStorage.getItem('completedLessons');
    if (savedProgress) {
      setCompletedLessons(new Set(JSON.parse(savedProgress)));
    }
  }, []);

  const getUnlockedModules = () => {
    return modulesWithLessons.map(module => {
      if (module.id === 'module-3') {
        return {
          ...module,
          lessons: [
            {
              id: 'lesson-3-1',
              module_id: 'module-3',
              title: 'Chave de ativacao definitiva',
              content_type: 'download' as const,
              content_url: 'https://drive.google.com/file/d/1U-RYQm6odJ7HO2_VhCOZ4Iev-5gVO6mm/view?usp=sharing',
              content_text: null,
              icon: 'Download',
              order_index: 1,
              locked: false,
            },
            {
              id: 'lesson-3-2',
              module_id: 'module-3',
              title: 'Bonus planilha comparativa renda fixa',
              content_type: 'video' as const,
              content_url: 'https://www.youtube.com/embed/WzvEJud2-_g?rel=0&modestbranding=1&showinfo=0&controls=1',
              content_text: null,
              icon: 'Video',
              order_index: 2,
              locked: false,
            },
          ],
        };
      }
      return module;
    });
  };

  const unlockContent = () => {
    const unlockedModules = getUnlockedModules();
    setModules(unlockedModules);
    
    if (selectedLesson && selectedLesson.locked) {
      const module3 = unlockedModules.find(m => m.id === 'module-3');
      if (module3 && module3.lessons.length > 0) {
        setSelectedLesson(module3.lessons[0]);
      }
    }
  };

  const handleUnlock = (key: string) => {
    if (key === UNLOCK_KEY) {
      localStorage.setItem('contentUnlocked', 'true');
      setIsUnlocked(true);
      unlockContent();
      setShowUnlockModal(false);
      return true;
    }
    return false;
  };

  const handleSelectLesson = (lesson: Lesson) => {
    if (lesson.locked && !isUnlocked) {
      setShowUnlockModal(true);
    } else {
      const currentModule = modules.find(m => m.id === lesson.module_id);
      if (currentModule) {
        const updatedLesson = currentModule.lessons.find(l => l.id === lesson.id);
        setSelectedLesson(updatedLesson || lesson);
      } else {
        setSelectedLesson(lesson);
      }
    }
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      localStorage.setItem('completedLessons', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50/30">
      <Header
        course={course}
        progressPercentage={progressPercentage}
        onLogout={onLogout}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <Sidebar
              modules={modules}
              selectedLesson={selectedLesson}
              completedLessons={completedLessons}
              onSelectLesson={handleSelectLesson}
              onToggleComplete={toggleLessonComplete}
              themeColor={course.theme_color}
              isUnlocked={isUnlocked}
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <ContentArea
              lesson={selectedLesson}
              themeColor={course.theme_color}
              isLocked={selectedLesson?.locked && !isUnlocked}
              onUnlockClick={() => setShowUnlockModal(true)}
            />
          </div>
        </div>
      </div>

      <WhatsAppButton />

      {showUnlockModal && (
        <UnlockModal
          onClose={() => setShowUnlockModal(false)}
          onUnlock={handleUnlock}
        />
      )}
    </div>
  );
}
