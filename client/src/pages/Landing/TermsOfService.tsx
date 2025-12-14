import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para Home
                </Link>

                <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-lg text-gray-400">
                        Última atualização: 13 de dezembro de 2024
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e usar o ViralCuts, você concorda em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não use nosso serviço.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">2. Descrição do Serviço</h2>
                        <p>
                            ViralCuts é uma plataforma SaaS que utiliza inteligência artificial para transformar vídeos longos em shorts otimizados para redes sociais. Nossos serviços incluem:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Processamento automático de vídeos com IA</li>
                            <li>Geração de legendas e captions</li>
                            <li>Reenquadramento para formato vertical (9:16)</li>
                            <li>Remoção automática de silêncios</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">3. Conta de Usuário</h2>
                        <p>Para usar o ViralCuts, você deve:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Ter pelo menos 18 anos de idade</li>
                            <li>Fornecer informações precisas e completas</li>
                            <li>Manter a segurança de sua senha</li>
                            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                            <li>Ser responsável por todas as atividades em sua conta</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">4. Uso Aceitável</h2>
                        <p>Você concorda em NÃO:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Fazer upload de conteúdo ilegal, ofensivo ou que viole direitos autorais</li>
                            <li>Usar o serviço para spam ou atividades maliciosas</li>
                            <li>Tentar acessar sistemas ou dados não autorizados</li>
                            <li>Revender ou redistribuir nosso serviço sem permissão</li>
                            <li>Fazer engenharia reversa de nossa tecnologia</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">5. Propriedade Intelectual</h2>
                        <p>
                            Você mantém todos os direitos sobre o conteúdo que faz upload. Ao usar nosso serviço, você nos concede uma licença limitada para processar seus vídeos.
                            Todo o software, algoritmos e tecnologia do ViralCuts são de nossa propriedade exclusiva.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">6. Pagamentos e Assinaturas</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>As assinaturas são cobradas mensalmente ou anualmente</li>
                            <li>Você pode cancelar a qualquer momento</li>
                            <li>Não oferecemos reembolsos, exceto conforme exigido por lei</li>
                            <li>Garantia de satisfação de 7 dias para novos usuários</li>
                            <li>Reservamo-nos o direito de alterar preços com aviso prévio</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">7. Limitação de Responsabilidade</h2>
                        <p>
                            O ViralCuts é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros.
                            Não somos responsáveis por perdas indiretas, incidentais ou consequenciais.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">8. Rescisão</h2>
                        <p>
                            Podemos suspender ou encerrar sua conta se você violar estes termos. Você pode encerrar sua conta a qualquer momento através das configurações.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">9. Alterações nos Termos</h2>
                        <p>
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos você sobre mudanças significativas por email ou através da plataforma.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white mt-8">10. Contato</h2>
                        <p>
                            Para questões sobre estes termos, entre em contato:{' '}
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

export default TermsOfService;
