import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "Como a IA funciona?",
        answer: "Nossos algoritmos avançados analisam vídeo e áudio para detectar oradores, momentos interessantes e contexto. Em seguida, ele reenquadra automaticamente o conteúdo para o formato vertical e adiciona legendas."
    },
    {
        question: "Posso editar as legendas?",
        answer: "Sim! Você tem controle total. Você pode editar texto, mudar fontes, cores e posições em nosso editor fácil de usar."
    },
    {
        question: "Quais plataformas são suportadas?",
        answer: "ViralCuts otimiza vídeos para TikTok, Instagram Reels, YouTube Shorts e Snapchat Spotlight."
    },
    {
        question: "Existe um teste grátis?",
        answer: "Como nossa IA utiliza recursos de processamento avançados e dispendiosos, não oferecemos um plano gratuito. No entanto, oferecemos uma garantia de satisfação de 7 dias ou seu dinheiro de volta."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/20">
                            <button
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            >
                                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                                <div className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                                    {openIndex === idx ? (
                                        <Minus className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
