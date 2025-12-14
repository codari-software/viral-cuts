import { useState, useEffect } from 'react';
import { adminAPI } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Trash2, UserPlus, Shield } from 'lucide-react';
import { toast } from 'react-toastify';

interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    plan?: string;
}

export default function Admin() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newUser, setNewUser] = useState({ email: '', password: '', name: '', plan: 'creator' });
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await adminAPI.getAllUsers();
            setUsers(response.data);
        } catch (error: any) {
            console.error('Error fetching users:', error);
            if (error.response?.status === 403) {
                toast.error('Acesso Negado: Você não tem permissão para ver esta página.');
            } else {
                toast.error('Falha ao buscar usuários');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            await adminAPI.createUser(newUser);
            toast.success('Usuário criado com sucesso');
            setNewUser({ email: '', password: '', name: '', plan: 'creator' });
            fetchUsers();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Falha ao criar usuário');
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

        try {
            await adminAPI.deleteUser(id);
            toast.success('Usuário deletado com sucesso');
            fetchUsers();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Falha ao deletar usuário');
        }
    };

    if (isLoading) return <div className="p-8 text-white">Carregando...</div>;

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold text-foreground">Painel Admin</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create User Form */}
                    <div className="glass-card p-6 h-fit bg-card border-border">
                        <div className="flex items-center gap-2 mb-6">
                            <UserPlus className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold text-foreground">Criar Usuário</h2>
                        </div>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <Input
                                label="Nome"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                required
                            />
                            <Input
                                label="E-mail"
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Senha"
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                required
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Plano</label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
                                    value={newUser.plan}
                                    onChange={(e) => setNewUser({ ...newUser, plan: e.target.value })}
                                >
                                    <option value="creator">Creator (Gratuito)</option>
                                    <option value="pro">Pro</option>
                                    <option value="agency">Agency</option>
                                </select>
                            </div>

                            <Button type="submit" className="w-full" isLoading={isCreating}>
                                Criar Usuário
                            </Button>
                        </form>
                    </div>

                    {/* Users List */}
                    <div className="glass-card p-6 lg:col-span-2 bg-card border-border">
                        <h2 className="text-xl font-semibold text-foreground mb-6">Usuários ({users.length})</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                                    <tr>
                                        <th className="px-6 py-3">Nome</th>
                                        <th className="px-6 py-3">E-mail</th>
                                        <th className="px-6 py-3">Plano</th>
                                        <th className="px-6 py-3">Criado Em</th>
                                        <th className="px-6 py-3 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {users.map((user) => (
                                        <tr key={user._id} className="group hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 text-foreground font-medium">{user.name}</td>
                                            <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${(user.plan || 'creator') === 'agency'
                                                        ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                                        : (user.plan || 'creator') === 'pro'
                                                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                            : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                    }`}>
                                                    {(user.plan || 'creator').charAt(0).toUpperCase() + (user.plan || 'creator').slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground text-sm">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Deletar Usuário"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-gray-500">
                                                Nenhum usuário encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
