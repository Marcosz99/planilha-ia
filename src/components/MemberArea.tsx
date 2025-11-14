import { useEffect, useState } from 'react';
import { supabase, Course, ModuleWithLessons, Lesson } from '../lib/supabase';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import Header from './Header';
import WhatsAppButton from './WhatsAppButton';

export default function MemberArea() {
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<ModuleWithLessons[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourseData();
  }, []);

  async function loadCourseData() {
    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .maybeSingle();

      if (courseData) {
        setCourse(courseData);

        const { data: modulesData } = await supabase
          .from('modules')
          .select('*')
          .eq('course_id', courseData.id)
          .order('order_index');

        if (modulesData) {
          const modulesWithLessons = await Promise.all(
            modulesData.map(async (module) => {
              const { data: lessonsData } = await supabase
                .from('lessons')
                .select('*')
                .eq('module_id', module.id)
                .order('order_index');

              return {
                ...module,
                lessons: lessonsData || [],
              };
            })
          );

          setModules(modulesWithLessons);

          if (modulesWithLessons.length > 0 && modulesWithLessons[0].lessons.length > 0) {
            setSelectedLesson(modulesWithLessons[0].lessons[0]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading course data:', error);
    } finally {
      setLoading(false);
    }
  }

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">Carregando...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Nenhum curso encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50/30">
      <Header
        course={course}
        progressPercentage={progressPercentage}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <Sidebar
              modules={modules}
              selectedLesson={selectedLesson}
              completedLessons={completedLessons}
              onSelectLesson={setSelectedLesson}
              onToggleComplete={toggleLessonComplete}
              themeColor={course.theme_color}
            />
          </div>

          <div className="lg:col-span-8 xl:col-span-9">
            <ContentArea
              lesson={selectedLesson}
              themeColor={course.theme_color}
            />
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
