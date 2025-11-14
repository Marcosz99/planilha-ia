import { Lesson } from '../lib/supabase';
import { Download, FileText, Video, ExternalLink } from 'lucide-react';

interface ContentAreaProps {
  lesson: Lesson | null;
  themeColor: string;
}

export default function ContentArea({ lesson, themeColor }: ContentAreaProps) {
  if (!lesson) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Selecione uma aula
          </h3>
          <p className="text-gray-500">
            Escolha uma aula no menu lateral para começar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
      </div>

      <div className="p-6">
        {lesson.content_type === 'video' && lesson.content_url && (
          <>
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={lesson.content_url}
                title={lesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Video className="w-5 h-5" style={{ color: themeColor }} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Playlist Completa
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Assista todos os vídeos do curso diretamente no YouTube
              </p>
              <a
                href="https://www.youtube.com/playlist?list=PLIxoQmbzx71hStx4Yok0dv0pIrd3GRj2p"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                style={{ backgroundColor: themeColor }}
              >
                <ExternalLink className="w-5 h-5" />
                Ver Playlist Completa
              </a>
            </div>
          </>
        )}

        {lesson.content_type === 'download' && (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{ backgroundColor: themeColor }}
              >
                <Download className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Arquivo disponível para download
              </h3>
              <p className="text-gray-600">
                Clique no botão abaixo para baixar o arquivo
              </p>
            </div>

            <a
              href={lesson.content_url || '#'}
              download
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ backgroundColor: themeColor }}
            >
              <Download className="w-5 h-5" />
              Baixar {lesson.title}
            </a>
          </div>
        )}

        {lesson.content_type === 'pdf' && (
          <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{ backgroundColor: themeColor }}
              >
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Documento PDF
              </h3>
              <p className="text-gray-600">
                Material complementar em formato PDF
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={lesson.content_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl text-white font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{ backgroundColor: themeColor }}
              >
                <ExternalLink className="w-5 h-5" />
                Abrir PDF
              </a>

              <a
                href={lesson.content_url || '#'}
                download
                className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
              >
                <Download className="w-5 h-5" />
                Baixar PDF
              </a>
            </div>
          </div>
        )}

        {lesson.content_type === 'text' && lesson.content_text && (
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {lesson.content_text}
            </div>
          </div>
        )}

        {!lesson.content_url && !lesson.content_text && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Conteúdo em breve...</p>
          </div>
        )}
      </div>
    </div>
  );
}
