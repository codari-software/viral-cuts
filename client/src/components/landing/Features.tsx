// React import removed
import { Upload, Wand2, Share2, Crop, TrendingUp, Rocket } from 'lucide-react';

const features = [
    {
        icon: <Rocket className="w-6 h-6 text-primary" />,
        title: "Viral Speed (Dinâmica)",
        description: "Aceleração inteligente de 1.25x para maximizar a retenção e o engajamento sem perder a compreensão."
    },
    {
        icon: <Crop className="w-6 h-6 text-secondary" />,
        title: "Reenquadramento Inteligente",
        description: "Mantém automaticamente o orador em foco para vídeos verticais 9:16."
    },
    {
        icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
        title: "Pontuação de Viralidade",
        description: "A IA analisa seu gancho e ritmo para prever o desempenho."
    }
];

const steps = [
    {
        icon: <Upload className="w-8 h-8" />,
        title: "Envie seu Vídeo",
        desc: "Cole um link do YouTube ou envie um arquivo."
    },
    {
        icon: <Wand2 className="w-8 h-8" />,
        title: "Processamento IA",
        desc: "Nossa IA seleciona os melhores momentos e os edita."
    },
    {
        icon: <Share2 className="w-8 h-8" />,
        title: "Publicar",
        desc: "Exporte mais de 10 shorts virais prontos para postar."
    }
];

const Features = () => {
    return (
        <section id="features" className="scroll-mt-28 py-24 bg-black relative">
            {/* Steps Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Como Funciona</h2>
                    <p className="text-xl text-gray-400">De vídeos longos para curtos em três passos simples.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center group">
                            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-black z-10">
                                <div className="text-primary group-hover:text-white transition-colors">
                                    {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grid Features */}
            <div id="viral-features" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Feito para Viralizar</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">Tudo o que você precisa para dominar os algoritmos de vídeos curtos.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                            <div className="mb-6 bg-white/5 w-14 h-14 rounded-full flex items-center justify-center border border-white/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
