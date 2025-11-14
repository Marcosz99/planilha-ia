import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511999999999';
    const message = 'Olá! Preciso de suporte com o curso.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-50 group"
      aria-label="Suporte via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />

      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        Suporte via WhatsApp
      </span>
    </button>
  );
}
