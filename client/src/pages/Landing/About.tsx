import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { Target, Users, Zap, Heart } from 'lucide-react';

const values = [
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: "Velocidade Extrema",
        desc: "Acreditamos que a edição não deve levar horas. Nosso foco é economizar seu tempo."
    },
    {
        icon: <Target className="w-6 h-6 text-red-400" />,
        title: "Qualidade Viral",
        desc: "Não basta cortar. Entregamos conteúdo otimizado para retenção e engajamento."
    },
    {
        icon: <Users className="w-6 h-6 text-blue-400" />,
        title: "Criador em 1º Lugar",
        desc: "Ferramentas feitas por criadores, para criadores. Entendemos sua jornada."
    },
    {
        icon: <Heart className="w-6 h-6 text-pink-400" />,
        title: "Paixão por Vídeo",
        desc: "Amamos o que fazemos e queremos que você ame o resultado final."
    }
];

const About = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    Nossa missão é <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        democratizar a viralização.
                    </span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    A ViralCuts nasceu da frustração. Passávamos mais tempo editando vídeos do que criando conteúdo.
                    Decidimos mudar isso usando o poder da Inteligência Artificial.
                </p>
            </div>

            {/* Stats */}
            <div className="border-y border-white/5 bg-white/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">10k+</div>
                            <div className="text-gray-400">Usuários Ativos</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">1M+</div>
                            <div className="text-gray-400">Vídeos Gerados</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">30+</div>
                            <div className="text-gray-400">Idiomas</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-gray-400">Suporte IA</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-12 text-center">Nossos Valores</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((val, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center mb-4 border border-white/10">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Team Placeholder */}
            <div className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-12">Quem Faz Acontecer</h2>
                <div className="inline-flex items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10">
                    <p className="text-lg text-gray-300">
                        Somos um time pequeno e apaixonado de engenheiros e designers baseado em São Paulo 🇧🇷
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
