import { NavLink } from "react-router-dom";
import { LayoutDashboard, Scissors, Settings, LogOut, Video } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const navigation = [
    { name: 'Painel', href: '/', icon: LayoutDashboard },
    { name: 'Projetos', href: '/projects', icon: Video },
    { name: 'Editor', href: '/editor/new', icon: Scissors },
    { name: 'Configurações', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const { logout, user } = useAuth();

    return (
        <div className="hidden lg:flex h-screen w-64 bg-surface border-r border-border flex-col fixed left-0 top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                        <Video className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                        ViralCuts
                    </span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-6">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                                ${isActive
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }
                            `}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                {user && (
                    <div className="mb-3 px-3">
                        <p className="text-xs text-muted-foreground">Entrou como</p>
                        <p className="text-sm text-foreground font-medium truncate">{user.email}</p>
                    </div>
                )}
                <button
                    onClick={logout}
                    className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sair
                </button>
            </div>
        </div>
    );
}
