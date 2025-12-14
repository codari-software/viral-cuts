// React import removed
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold text-white">ViralCuts</span>
                        </div>
                        <p className="text-gray-400 max-w-sm mb-6">
                            Empoderando criadores para alcançar milhões com conteúdo de vídeo curto impulsionado por IA.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Produto</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="/#viral-features" className="hover:text-primary transition-colors">Recursos</a></li>
                            <li><a href="/#pricing" className="hover:text-primary transition-colors">Preços</a></li>
                            <li><a href="/#demo" className="hover:text-primary transition-colors">Vitrine</a></li>
                            <li><Link to="/roadmap" className="hover:text-primary transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Empresa</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/about" className="hover:text-primary transition-colors">Sobre</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><a href="mailto:suporte@codariapp.com.br" className="hover:text-primary transition-colors">Contato</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-500 text-sm flex flex-col md:flex-row gap-2">
                        <p>© {new Date().getFullYear()} ViralCuts. Todos os direitos reservados.</p>
                        <span className="hidden md:block">•</span>
                        <p>Feito pela <a href="https://codariapp.com.br" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Codari</a></p>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidade</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
