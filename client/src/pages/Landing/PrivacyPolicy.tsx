import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para Home
                </Link>

                <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-lg text-gray-400">
                        Última atualização: 13 de dezembro de 2024
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">1. Informações que Coletamos</h2>
                        <p>
                            Na ViralCuts, levamos sua privacidade a sério. Coletamos as seguintes informações quando você usa nosso serviço:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Informações de conta (nome, email, senha criptografada)</li>
                            <li>Vídeos que você faz upload para processamento</li>
                            <li>Dados de uso e análise para melhorar nosso serviço</li>
                            <li>Informações de pagamento (processadas de forma segura por terceiros)</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">2. Como Usamos Suas Informações</h2>
                        <p>Utilizamos suas informações para:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Processar seus vídeos usando nossa tecnologia de IA</li>
                            <li>Melhorar e personalizar sua experiência</li>
                            <li>Enviar atualizações importantes sobre o serviço</li>
                            <li>Processar pagamentos e gerenciar sua assinatura</li>
                            <li>Prevenir fraudes e garantir a segurança da plataforma</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">3. Compartilhamento de Dados</h2>
                        <p>
                            Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provedores de serviços que nos ajudam a operar a plataforma</li>
                            <li>Processadores de pagamento para transações financeiras</li>
                            <li>Autoridades legais quando exigido por lei</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">4. Segurança dos Dados</h2>
                        <p>
                            Implementamos medidas de segurança robustas, incluindo:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Criptografia SSL/TLS para todas as transmissões de dados</li>
                            <li>Armazenamento seguro de senhas com hash bcrypt</li>
                            <li>Backups regulares e redundância de dados</li>
                            <li>Monitoramento contínuo de segurança</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">5. Seus Direitos</h2>
                        <p>Você tem o direito de:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Acessar seus dados pessoais</li>
                            <li>Solicitar correção de informações incorretas</li>
                            <li>Solicitar exclusão de sua conta e dados</li>
                            <li>Exportar seus dados em formato legível</li>
                            <li>Optar por não receber comunicações de marketing</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">6. Cookies</h2>
                        <p>
                            Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar conteúdo.
                            Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">7. Contato</h2>
                        <p>
                            Para questões sobre privacidade, entre em contato conosco em:{' '}
                            <a href="mailto:suporte@codariapp.com.br" className="text-primary hover:text-primary-hover">
                                suporte@codariapp.com.br
                            </a>
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
