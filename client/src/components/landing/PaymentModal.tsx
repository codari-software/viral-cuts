import { useState, useEffect } from 'react';
import { X, Copy, Check, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: {
        name: string;
        price: number;
    };
}

const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
    const [step, setStep] = useState<'register' | 'payment' | 'success'>('register');
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(false);
    const [qrCodeData, setQrCodeData] = useState<{ qrCodeImage: string; pixCopiaECola: string; txid: string } | null>(null);
    const [copied, setCopied] = useState(false);
    const [status, setStatus] = useState<'pending' | 'paid'>('pending');

    useEffect(() => {
        if (!isOpen) {
            // Reset state on close
            setQrCodeData(null);
            setStatus('pending');
            setStep('register');
            setFormData({ name: '', email: '' });
        }
    }, [isOpen]);

    // Polling for status
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (qrCodeData?.txid && status === 'pending' && step === 'payment') {
            interval = setInterval(checkStatus, 5000);
        }
        return () => clearInterval(interval);
    }, [qrCodeData, status, step]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await generatePix();
    };

    const generatePix = async () => {
        setLoading(true);
        try {
            // In a real scenario, this URL should be your production backend URL
            // For dev: http://localhost:3000/api/payment/pix
            const response = await fetch('http://localhost:3000/api/payment/pix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan: plan.name,
                    price: plan.price,
                    name: formData.name,
                    email: formData.email
                })
            });
            const data = await response.json();
            if (data.success) {
                setQrCodeData(data);
                setStep('payment');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkStatus = async () => {
        if (!qrCodeData?.txid) return;
        try {
            const response = await fetch(`http://localhost:3000/api/payment/status/${qrCodeData.txid}`);
            const data = await response.json();
            if (data.paid) {
                setStatus('paid');
                setStep('success'); // Move to success step immediately
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCopy = () => {
        if (qrCodeData?.pixCopiaECola) {
            navigator.clipboard.writeText(qrCodeData.pixCopiaECola);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {step === 'register' ? 'Confirme seus dados' :
                            step === 'payment' ? 'Pagamento via PIX' : 'Pagamento Confirmado!'}
                    </h2>
                    <p className="text-gray-400">Plano {plan.name} - <span className="text-green-400 font-bold">R$ {plan.price.toFixed(2)}</span></p>
                </div>

                {step === 'register' && (
                    <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Nome Completo</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition-colors"
                                placeholder="Seu nome"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">E-mail</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-primary transition-colors"
                                placeholder="seu@email.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors mt-4 disabled:opacity-50 flex items-center justify-center"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Continuar para Pagamento'}
                        </button>
                    </form>
                )}

                {step === 'payment' && (
                    <>
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-gray-400">Gerando QR Code...</p>
                            </div>
                        ) : (
                            qrCodeData ? (
                                <div className="flex flex-col items-center animate-fadeIn">
                                    <div className="bg-white p-4 rounded-xl mb-6">
                                        <img src={qrCodeData.qrCodeImage} alt="QR Code PIX" className="w-48 h-48" />
                                    </div>

                                    <div className="w-full mb-6">
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pix Copia e Cola</label>
                                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3">
                                            <input
                                                type="text"
                                                readOnly
                                                value={qrCodeData.pixCopiaECola}
                                                className="bg-transparent text-gray-400 text-sm flex-1 outline-none truncate"
                                            />
                                            <button onClick={handleCopy} className="text-primary hover:text-white transition-colors">
                                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-4 py-3 rounded-lg text-sm mb-6">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <p>Após pagar, aguarde alguns segundos nesta tela.</p>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </>
                )}

                {step === 'success' && (
                    <div className="text-center py-8 animate-scaleIn">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Pagamento Confirmado!</h3>
                        <p className="text-gray-400 mb-8">Enviamos um e-mail com os detalhes da sua assinatura.</p>
                        <button onClick={onClose} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-colors">
                            Começar a usar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
