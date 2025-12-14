import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const roadmapData = [
    {
        quarter: 'Q1 2025',
        status: 'completed',
        title: 'Lançamento MVP',
        items: ['Legendas IA em PT-BR', 'Exportação 1080p', 'Reenquadramento Automático']
    },
    {
        quarter: 'Q2 2025',
        status: 'current',
        title: 'Expansão Global',
        items: ['Suporte a 30+ idiomas', 'Estilos de legenda personalizados', 'Integração direta com TikTok']
    },
    {
        quarter: 'Q3 2025',
        status: 'planned',
        title: 'Colaboração & IA 2.0',
        items: ['Editor colaborativo em tempo real', 'Clonagem de voz', 'Geração de roteiros com IA']
    },
    {
        quarter: 'Q4 2025',
        status: 'planned',
        title: 'Dominação Total',
        items: ['App Mobile (iOS/Android)', 'Analytics Preditivo', 'Agendamento de posts']
    }
];

const Roadmap = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Roadmap do Produto
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Veja o que estamos construindo para revolucionar a criação de conteúdo.
                        Transparência total sobre nosso futuro.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 md:left-1/2 md:-ml-[1px]" />

                    <div className="space-y-12">
                        {roadmapData.map((phase, idx) => (
                            <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Icon Marker */}
                                <div className="absolute left-8 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-black z-10 flex items-center justify-center">
                                    <div className={`w-full h-full rounded-full border-2 flex items-center justify-center ${phase.status === 'completed' ? 'bg-green-500 border-green-500' :
                                        phase.status === 'current' ? 'bg-primary border-primary animate-pulse' :
                                            'bg-black border-gray-600'
                                        }`}>
                                        {phase.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        {phase.status === 'current' && <Clock className="w-4 h-4 text-white" />}
                                        {phase.status === 'planned' && <Circle className="w-4 h-4 text-gray-400" />}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-16 md:ml-0 md:w-1/2 md:px-8">
                                    <div className={`p-6 rounded-2xl border ${phase.status === 'current' ? 'bg-primary/5 border-primary/30' :
                                        'bg-white/5 border-white/10 hover:border-white/20'
                                        } transition-colors duration-300`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                phase.status === 'current' ? 'bg-primary/20 text-primary' :
                                                    'bg-white/10 text-gray-400'
                                                }`}>
                                                {phase.quarter}
                                            </span>
                                            {phase.status === 'current' && (
                                                <span className="text-xs font-bold text-primary uppercase tracking-wider">Em Progresso</span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                                        <ul className="space-y-3">
                                            {phase.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Empty side for layout balance */}
                                <div className="hidden md:block md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Roadmap;
