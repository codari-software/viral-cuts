import { useState } from 'react';
import { Check } from 'lucide-react';

const plans = [
    {
        name: 'Creator',
        price: 29,
        description: 'Perfeito para criadores de conteúdo iniciantes.',
        caktoMonthly: 'https://pay.cakto.com.br/dwnqjum_687441',
        caktoAnnual: 'https://pay.cakto.com.br/32bk3v8',
        features: [
            '10 Shorts por mês',
            'Detector de Ganchos (Viral)',
            'Exportação Otimizada',
            'Resolução 720p',
            'Sem marca d\'água'
        ]
    },
    {
        name: 'Pro',
        price: 79,
        popular: true,
        description: 'Para canais em crescimento e pequenas equipes.',
        caktoMonthly: 'https://pay.cakto.com.br/363ed7o',
        caktoAnnual: 'https://pay.cakto.com.br/6r3myrf',
        features: [
            '50 Shorts por mês',
            'Legendas Dinâmicas (Karaokê)',
            'Detector de Ganchos (Viral)',
            'Viral Speed (Aceleração)',
            'Magic Zoom (Retenção)',
            'Resolução 1080p'
        ]
    },
    {
        name: 'Agency',
        price: 199,
        description: 'Escalone sua produção de conteúdo.',
        caktoMonthly: 'https://pay.cakto.com.br/5g6cgzu',
        caktoAnnual: 'https://pay.cakto.com.br/34ix6fm',
        features: [
            'Shorts Ilimitados',
            'Dublagem IA (Smart Voice Over)',
            'Fila de Processamento VIP',
            'Integração Zapier/Webhooks',
            'Resolução 4K Ultra HD',
            'Acesso à API (Beta)'
        ]
    }
];

const Pricing = () => {
    const [annual, setAnnual] = useState(false);

    const handleSubscribe = (plan: typeof plans[0]) => {
        const link = annual ? plan.caktoAnnual : plan.caktoMonthly;
        window.open(link, '_blank');
    };

    return (
        <section id="pricing" className="scroll-mt-28 py-24 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Preços Simples</h2>
                    <p className="text-xl text-gray-400 mb-8">Escolha o plano ideal para o seu crescimento.</p>

                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm ${!annual ? 'text-white' : 'text-gray-500'}`}>Mensal</span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className="w-14 h-7 bg-white/10 rounded-full relative transition-colors duration-200"
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-primary rounded-full transition-all duration-200 ${annual ? 'left-8' : 'left-1'}`} />
                        </button>
                        <span className={`text-sm ${annual ? 'text-white' : 'text-gray-500'}`}>Anual <span className="text-green-500 text-xs ml-1 font-bold">(ECONOMIZE 20%)</span></span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'} hover:transform hover:-translate-y-2 transition-all duration-300`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                                    MAIS POPULAR
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <p className="text-gray-400 mb-6 h-12">{plan.description}</p>
                            <div className="flex items-baseline mb-8">
                                <span className="text-5xl font-bold">${annual ? Math.round(plan.price * 0.8) : plan.price}</span>
                                <span className="text-gray-400 ml-2">/mês</span>
                            </div>
                            <button
                                onClick={() => handleSubscribe(plan)}
                                className={`block w-full py-3 rounded-xl font-bold mb-8 transition-colors text-center ${plan.popular ? 'bg-primary hover:bg-primary-hover text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                            >
                                Assinar Agora
                            </button>
                            <ul className="space-y-4">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
