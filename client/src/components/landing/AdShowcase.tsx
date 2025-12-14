import { Clock, Zap, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

const AdShowcase = () => {
    return (
        <section className="py-24 bg-zinc-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Conceitos de Criativos (9:16)</h2>
                    <p className="text-gray-400">Visualização dos anúncios planejados para Instagram Reels/Stories.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 justify-items-center">
                    {/* Creative 1: The Magic */}
                    <div className="w-[300px] h-[533px] bg-black border border-white/10 rounded-[30px] overflow-hidden relative shadow-2xl flex flex-col group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
                        <div className="absolute top-2 right-4 text-[10px] text-gray-500">AD 01</div>

                        {/* Content */}
                        <div className="flex-1 bg-gray-900 relative">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-full h-1 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-scan"></div>
                                <div className="mt-8 bg-black/80 backdrop-blur px-4 py-2 rounded-xl border border-green-500/30">
                                    <p className="text-green-400 font-bold text-center animate-pulse">GERANDO SHORTS...</p>
                                </div>
                            </div>

                            {/* Overlay Text */}
                            <div className="absolute top-20 left-4 right-4 text-center">
                                <p className="text-2xl font-black text-white drop-shadow-lg italic uppercase">Pare de Editar</p>
                                <p className="text-2xl font-black text-primary drop-shadow-lg italic uppercase">Comece a Gerar</p>
                            </div>

                            {/* CTA */}
                            <div className="absolute bottom-10 left-4 right-4">
                                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-full animate-bounce">
                                    Teste Grátis Agora
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Creative 2: Problem vs Solution */}
                    <div className="w-[300px] h-[533px] bg-black border border-white/10 rounded-[30px] overflow-hidden relative shadow-2xl flex flex-col group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
                        <div className="absolute top-2 right-4 text-[10px] text-gray-500">AD 02</div>

                        {/* Split Screen */}
                        <div className="h-1/2 bg-red-900/20 relative border-b border-white/10">
                            <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1585241936939-be05368a5793?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale"></div>
                            <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded text-xs font-bold text-white">MANUALMENTE</div>
                            <div className="relative z-10 flex flex-col items-center">
                                <Clock className="w-8 h-8 text-red-500 mb-2" />
                                <span className="text-xl font-bold text-red-100">3 Horas</span>
                            </div>
                        </div>

                        <div className="h-1/2 bg-green-900/20 relative">
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"></div>
                            <div className="absolute top-4 left-4 bg-green-600 px-2 py-1 rounded text-xs font-bold text-white">COM IA</div>
                            <div className="relative z-10 flex flex-col items-center">
                                <Zap className="w-8 h-8 text-green-500 mb-2" />
                                <span className="text-xl font-bold text-green-100">3 Minutos</span>
                            </div>
                            {/* CTA */}
                            <div className="absolute bottom-8 left-4 right-4">
                                <button className="w-full bg-white text-black font-bold py-2 rounded-full text-sm">
                                    Economize Tempo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Creative 3: Viral Score */}
                    <div className="w-[300px] h-[533px] bg-black border border-white/10 rounded-[30px] overflow-hidden relative shadow-2xl flex flex-col group hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-xl z-20"></div>
                        <div className="absolute top-2 right-4 text-[10px] text-gray-500">AD 03</div>

                        {/* Content */}
                        <div className="flex-1 bg-gray-900 relative flex flex-col p-6">
                            <div className="mt-12 mb-8">
                                <p className="text-xl font-bold text-white mb-2 leading-tight">Seu vídeo vai <span className="text-red-500">FLOPAR?</span></p>
                                <p className="text-sm text-gray-400">Descubra antes de postar.</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-400">Análise IA</span>
                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="w-full bg-white/10 h-2 rounded-full mb-1">
                                    <div className="w-[32%] h-full bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-right text-xs text-red-400 font-bold">32/100 (Ruim)</p>
                            </div>

                            <div className="flex justify-center my-2">
                                <div className="w-px h-8 bg-white/20"></div>
                            </div>

                            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs text-green-300">Otimizado</span>
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full mb-1">
                                        <div className="w-[98%] h-full bg-green-500 rounded-full"></div>
                                    </div>
                                    <p className="text-right text-xs text-green-400 font-bold">98/100 (Viral)</p>
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                                    <TrendingUp className="w-4 h-4" /> Ver Minha Nota
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdShowcase;
