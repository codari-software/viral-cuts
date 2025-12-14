import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                ViralCuts
                            </span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a href="/#viral-features" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Recursos</a>
                                <a href="/#features" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Como Funciona</a>
                                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">Preços</a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <a href="/login" className="text-gray-300 hover:text-white font-medium text-sm transition-colors">
                            Login
                        </a>
                        <a href="#pricing" className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-all duration-200 text-sm transform hover:scale-105 inline-block">
                            Ver Planos
                        </a>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="/#viral-features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Recursos</a>
                        <a href="/#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Como Funciona</a>
                        <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Preços</a>
                        <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/10">Login</a>
                        <div className="mt-4 px-3">
                            <a href="#pricing" className="block w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-all text-center">
                                Ver Planos
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
