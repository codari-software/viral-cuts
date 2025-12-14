import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { authAPI } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Settings() {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("As novas senhas não coincidem");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("A nova senha deve ter pelo menos 6 caracteres");
            return;
        }

        setIsChangingPassword(true);
        try {
            await authAPI.changePassword({ currentPassword, newPassword });
            toast.success("Senha alterada com sucesso");
            setShowPasswordModal(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Falha ao alterar senha");
        } finally {
            setIsChangingPassword(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Configurações</h1>

            {showPasswordModal && (
                <Modal
                    isOpen={showPasswordModal}
                    onClose={() => setShowPasswordModal(false)}
                    title="Alterar Senha"
                >
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <Input
                            type="password"
                            label="Senha Atual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            label="Nova Senha"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            label="Confirmar Nova Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className="flex gap-3 justify-end mt-6">
                            <Button type="button" variant="ghost" onClick={() => setShowPasswordModal(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" isLoading={isChangingPassword}>
                                Confirmar
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Conta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-400">Endereço de E-mail</label>
                            <input type="email" value={user?.email || ''} disabled className="bg-black/50 border border-white/10 rounded-lg h-10 px-3 text-gray-300" />
                        </div>
                        <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
                            Alterar Senha
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Preferências</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-2">
                            <div className="text-sm text-foreground/80">Modo Escuro</div>
                            <Button
                                variant={theme === 'dark' ? 'primary' : 'outline'}
                                size="sm"
                                onClick={toggleTheme}
                            >
                                {theme === 'dark' ? 'Ativo' : 'Inativo'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
