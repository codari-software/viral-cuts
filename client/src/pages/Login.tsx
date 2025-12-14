import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Scissors } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <Scissors className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-muted-foreground mt-2">Entre na sua conta para continuar</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="voce@exemplo.com"
                            required
                        />

                        <Input
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Entrar
                        </Button>
                    </form>


                </div>
            </div>
        </div>
    );
}
