import { Link } from 'react-router-dom';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
    {
        id: 1,
        title: "Como Viralizar no TikTok em 2025: O Guia Definitivo",
        excerpt: "Analisamos mais de 10.000 vídeos virais para descobrir os padrões secretos que o algoritmo ama.",
        author: "Gabriel Silva",
        date: "12 Dez, 2024",
        category: "Estratégia",
        image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Shorts vs Reels vs TikTok: Onde Postar?",
        excerpt: "Descubra qual plataforma oferece o melhor ROI para criadores de conteúdo hoje.",
        author: "Ana Clara",
        date: "10 Dez, 2024",
        category: "Plataformas",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "A Revolução da IA na Edição de Vídeo",
        excerpt: "Como ferramentas como o ViralCuts estão economizando 90% do tempo de edição dos criadores.",
        author: "Carlos Tech",
        date: "08 Dez, 2024",
        category: "Tecnologia",
        image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&auto=format&fit=crop"
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6">Blog ViralCuts</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Dicas, tutoriais e insights para você dominar a criação de conteúdo.
                    </p>
                </div>

                {/* Featured Post (First one styled differently could go here, but simple grid for now) */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-bold text-primary px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
                                        {post.category}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    <Link to={`/blog/${post.id}`} className="hover:underline focus:outline-none">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <User className="w-3 h-3" /> {post.author}
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {post.date}
                                        </div>
                                    </div>
                                    <Link to={`/blog/${post.id}`} className="text-sm font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                                        Ler <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
