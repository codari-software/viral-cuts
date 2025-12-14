import { Play, ArrowRight } from 'lucide-react';

// ProductDemo removed in favor of VSL Player

const Hero = () => {
    return (
        <div className="relative min-h-screen overflow-hidden pt-16">
            <div className="flex flex-col items-center justify-center min-h-screen">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen opacity-30" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                    {/* Headline */}
                    <h1 className="text-5xl pt-10 md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        Transforme Vídeos Longos em <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                            Shorts Virais
                        </span> em Segundos
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
                        Detecte automaticamente os melhores momentos, adicione legendas cativantes e reenquadre vídeos horizontais para TikTok, Reels e Shorts. Aumente seu alcance em 10x com 0x esforço.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                        <a href="#pricing" className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-200 overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Começar Agora <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>

                        <a href="#demo" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm">
                            <Play className="w-5 h-5 fill-current" /> Ver Demo
                        </a>
                    </div>

                    {/* Animated Product Demo (CSS Keyframes) */}
                    <div className="relative mx-auto max-w-5xl group perspective-1000">
                        {/* Animated Glow Behind */}
                        <div
                            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-50 blur-xl transition-all group-hover:opacity-75 group-hover:blur-2xl animate-pulse"
                        />

                        {/* Main Editor Window Simulation */}
                        <div className="relative rounded-xl border border-white/10 bg-[#0F0F0F] shadow-2xl overflow-hidden aspect-video flex flex-col">
                            {/* Window Header */}
                            <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4 justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-xs font-mono text-gray-500">viralcuts.ai/editor</div>
                            </div>

                            {/* Editor Body */}
                            <div className="flex-1 flex relative">
                                {/* Sidebar (AI Tools) */}
                                <div className="w-64 border-r border-white/10 bg-black/20 p-4 space-y-3 hidden md:block">
                                    <div className="h-4 w-24 bg-white/10 rounded mb-6" />
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
                                            <div className={`w-8 h-8 rounded bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center`}>
                                                <div className="w-4 h-4 rounded-full bg-primary/50 animate-pulse" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-2 w-20 bg-white/10 rounded" />
                                                <div className="h-1.5 w-12 bg-white/5 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Main Canvas */}
                                <div className="flex-1 flex flex-col">
                                    {/* Video Area */}
                                    <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 animate-pulse" />

                                        {/* Simulated Video Content */}
                                        <div className="relative w-3/4 aspect-[9/16] bg-black/50 rounded-lg border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                                {/* Simulated Waves/Audio */}
                                                <div className="flex items-center gap-1 h-32">
                                                    {[...Array(10)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-2 bg-gradient-to-t from-primary to-purple-500 rounded-full animate-bounce"
                                                            style={{
                                                                height: `${Math.random() * 100}%`,
                                                                animationDelay: `${i * 0.1}s`,
                                                                animationDuration: '1s'
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                {/* Captions Simulation */}
                                                <div className="px-4 py-2 bg-black/50 backdrop-blur rounded-lg border border-white/10">
                                                    <div className="h-3 w-32 bg-yellow-400 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Success Badges */}
                                        <div className="absolute top-10 right-10 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 animate-bounce">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                                            Viral Score: 98
                                        </div>
                                    </div>

                                    {/* Bottom Timeline */}
                                    <div className="h-32 border-t border-white/10 bg-black/40 p-4 flex flex-col justify-center gap-2 relative overflow-hidden">
                                        {/* Scanner Line */}
                                        <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 left-1/4 animate-[scan_4s_linear_infinite]"
                                            style={{ boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }} />

                                        {/* Tracks */}
                                        {[1, 2, 3].map((track) => (
                                            <div key={track} className="h-6 bg-white/5 rounded relative overflow-hidden">
                                                {/* Clips */}
                                                <div className="absolute inset-y-0 left-0 w-1/3 bg-white/10" />
                                                <div className="absolute inset-y-0 left-1/2 w-1/4 bg-primary/40 border-l border-r border-primary/60" />
                                                <div className="absolute inset-y-0 right-10 w-1/6 bg-white/10" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
