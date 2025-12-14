import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';

const blogContent = {
    1: {
        title: "Como Viralizar no TikTok em 2025: O Guia Definitivo",
        author: "Gabriel Silva",
        date: "12 Dez, 2024",
        category: "Estratégia",
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop",
        content: `
            <p class="lead text-xl text-gray-300 font-medium mb-8">
                O algoritmo do TikTok muda constantemente. O que funcionava em 2023 - dancinhas e lip-sync - já não garante viralização em 2025. Hoje, a retenção e o "storytelling" são os reis.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">1. O Gancho (The Hook)</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                Você tem exatamente <strong>3 segundos</strong> para capturar a atenção. Se o usuário não parar de rolar o feed nesse tempo, seu vídeo morreu.
                <br /><br />
                Evite introduções longas como "Oi pessoal, tudo bem?". Vá direto ao ponto. Use frases de impacto:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-gray-400 mb-8">
                <li>"Pare de fazer isso se você quer crescer..."</li>
                <li>"O segredo que ninguém te conta sobre..."</li>
                <li>"Eu testei X para que você não precise..."</li>
            </ul>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">2. Edição Dinâmica</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                O conteúdo estático é entediante. Para manter a retenção alta (acima de 80%), você precisa de estímulos visuais constantes.
                Isso significa: cortes a cada 3-5 segundos, legendas coloridas, zoom-in/zoom-out e B-rolls.
                <br /><br />
                É aqui que o <strong>ViralCuts</strong> entra. Nossa IA faz exatamente isso automaticamente: remove silêncios e adiciona legendas dinâmicas que prendem a atenção.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">3. Frequência e Consistência</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                O TikTok recompensa criadores ativos. O ideal é postar de 1 a 3 vezes por dia. Parece muito?
                A chave é a reaproveitamento de conteúdo. Um vídeo longo do YouTube pode virar 10 Cortes (Shorts).
            </p>
        `
    },
    2: {
        title: "Shorts vs Reels vs TikTok: Onde Postar?",
        author: "Ana Clara",
        date: "10 Dez, 2024",
        category: "Plataformas",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop",
        content: `
            <p class="lead text-xl text-gray-300 font-medium mb-8">
                A batalha dos vídeos verticais está mais acirrada do que nunca. Mas onde você deve focar sua energia? A resposta curta: em todos. A resposta longa: depende do seu objetivo.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">TikTok: O Rei do Alcance Orgânico</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                O TikTok ainda é a melhor plataforma para crescer do zero. O algoritmo não se importa com quantos seguidores você tem, apenas com a qualidade do conteúdo.
                <br />
                <strong>Melhor para:</strong> Descobrimento, tendências e crescimento rápido.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">Instagram Reels: Estética e Vendas</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                Se você já tem uma audiência ou quer vender produtos/serviços, o Reels é imbatível. A audiência é mais "qualificada" para compra.
                <br />
                <strong>Melhor para:</strong> Construção de marca, vendas e engajamento com comunidade existente.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">YouTube Shorts: O Motor de Busca</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                O YouTube é o segundo maior motor de busca do mundo. Shorts têm uma vida útil mais longa que Reels e TikToks porque podem ser encontrados por pesquisa meses depois.
                <br />
                <strong>Melhor para:</strong> Conteúdo educativo, tutoriais e longevidade.
            </p>

            <div class="bg-primary/10 border border-primary/20 p-6 rounded-2xl mt-8">
                <h3 class="text-xl font-bold text-primary mb-2">Veredito?</h3>
                <p class="text-gray-300">
                    Poste em todos. Com ferramentas de IA, você pode criar uma vez e distribuir em todos os canais sem esforço extra.
                </p>
            </div>
        `
    },
    3: {
        title: "A Revolução da IA na Edição de Vídeo",
        author: "Carlos Tech",
        date: "08 Dez, 2024",
        category: "Tecnologia",
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&auto=format&fit=crop",
        content: `
            <p class="lead text-xl text-gray-300 font-medium mb-8">
                A edição de vídeo tradicional é lenta, cara e técnica. Mas 2024 marcou o início de uma nova era: a edição generativa e automatizada.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">O Fim do "Corte Seco" Manual</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                Editores passavam horas apenas removendo pausas e erros de gravação (o famoso "silence removal"). 
                Hoje, modelos de áudio transcrevem o vídeo e permitem que você corte o vídeo editando o texto.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">Reenquadramento Inteligente (Smart Reframing)</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                Transformar um vídeo horizontal (16:9) em vertical (9:16) era um pesadelo de keyframes. Você tinha que mover a "câmera" manualmente para seguir o sujeito.
                <br /><br />
                IAs de visão computacional agora detectam rostos e oradores ativos, mantendo-os centralizados automaticamente. É mágica.
            </p>

            <h2 class="text-3xl font-bold text-white mt-12 mb-6">Legendas que Ouvem</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                Com a precisão do Whisper (OpenAI) e outros modelos, a transcrição é 99% precisa. O ViralCuts leva isso além, sincronizando cada palavra com animações de "karaokê" que seguram a atenção do espectador.
            </p>
        `
    }
};

const BlogPost = () => {
    const { id } = useParams();
    const post = blogContent[Number(id) as keyof typeof blogContent];

    if (!post) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
                    <Link to="/blog" className="text-primary hover:underline">Voltar para o Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            <article className="pt-32 pb-20">
                {/* Header Image */}
                <div className="w-full h-[400px] relative mb-16">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors font-medium">
                            <ArrowLeft className="w-4 h-4" /> Voltar
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-gray-300 text-sm">
                                <Clock className="w-4 h-4" /> {post.readTime} de leitura
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="prose prose-invert prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share / CTA */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-bold">Gostou? Compartilhe:</span>
                            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                        <Link
                            to="/"
                            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                        >
                            Começar a Viralizar Agora
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogPost;
