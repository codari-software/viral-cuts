import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const DemoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    return (
        <section id="demo" className="scroll-mt-28 py-24 bg-gradient-to-b from-black via-primary/5 to-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Veja a Mágica Acontecer
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        De vídeo horizontal para Shorts virais em segundos. Assista como nossa IA transforma seu conteúdo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Before */}
                    <div className="space-y-4">
                        <div className="text-center mb-4">
                            <span className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-semibold text-sm">
                                ANTES
                            </span>
                        </div>
                        <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/10 group">
                            {/* Video placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Play className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <p className="text-gray-500 text-sm">Vídeo Horizontal 16:9</p>
                                    <p className="text-gray-600 text-xs mt-1">Difícil de viralizar no TikTok/Reels</p>
                                </div>
                            </div>

                            {/* Overlay with issues */}
                            <div className="absolute top-4 left-4 space-y-2">
                                <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full text-red-400 text-xs font-medium backdrop-blur-sm">
                                    ❌ Formato errado
                                </div>
                                <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full text-red-400 text-xs font-medium backdrop-blur-sm">
                                    ❌ Sem legendas
                                </div>
                                <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full text-red-400 text-xs font-medium backdrop-blur-sm">
                                    ❌ Partes vazias
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* After */}
                    <div className="space-y-4">
                        <div className="text-center mb-4">
                            <span className="inline-block px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary font-semibold text-sm">
                                DEPOIS
                            </span>
                        </div>
                        <div className="relative aspect-[9/16] max-h-[600px] mx-auto bg-black rounded-xl overflow-hidden border-2 border-secondary/50 shadow-2xl shadow-secondary/20 group">
                            {/* Video placeholder with demo content */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                                {/* Captions */}
                                <div className="absolute bottom-24 left-0 right-0 px-4 text-center">
                                    <div className="inline-block bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                        <p className="text-white font-bold text-lg leading-tight">
                                            "Transforme seus vídeos em<br />
                                            <span className="text-secondary">Shorts Virais</span> agora!"
                                        </p>
                                    </div>
                                </div>

                                {/* 9:16 badge */}
                                <div className="absolute top-4 right-4 bg-secondary text-black text-xs font-bold px-3 py-1 rounded-full">
                                    9:16
                                </div>

                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-10 h-10 text-white fill-white" />
                                        ) : (
                                            <Play className="w-10 h-10 text-white fill-white ml-1" />
                                        )}
                                    </button>
                                </div>

                                {/* Video controls */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="text-white hover:text-secondary transition-colors"
                                        >
                                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                        </button>
                                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-secondary w-1/3" />
                                        </div>
                                        <button
                                            onClick={() => setIsMuted(!isMuted)}
                                            className="text-white hover:text-secondary transition-colors"
                                        >
                                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                        </button>
                                        <button className="text-white hover:text-secondary transition-colors">
                                            <Maximize2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Success indicators */}
                            <div className="absolute top-4 left-4 space-y-2">
                                <div className="bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full text-secondary text-xs font-medium backdrop-blur-sm animate-fade-in">
                                    ✓ Formato 9:16
                                </div>
                                <div className="bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full text-secondary text-xs font-medium backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                    ✓ Legendas IA
                                </div>
                                <div className="bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full text-secondary text-xs font-medium backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                    ✓ Auto-corte
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-secondary mb-2">10x</div>
                        <div className="text-gray-400 text-sm">Mais Alcance</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">95%</div>
                        <div className="text-gray-400 text-sm">Menos Tempo</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-secondary mb-2">3 min</div>
                        <div className="text-gray-400 text-sm">Por Shorts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                        <div className="text-gray-400 text-sm">Automático</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href="#pricing"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
                    >
                        Começar Agora
                        <Play className="w-5 h-5 fill-current" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
