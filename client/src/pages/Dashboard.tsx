import { Play, Clock, TrendingUp, Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { projects, isLoading } = useProjects();
    const { user } = useAuth();
    const navigate = useNavigate();

    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const processingProjects = projects.filter(p => p.status === 'processing').length;
    const totalProjects = projects.length;

    const stats = [
        { label: "Total de Projetos", value: totalProjects.toString(), icon: Play, color: "text-blue-500" },
        { label: "Processando", value: processingProjects.toString(), icon: Clock, color: "text-secondary" },
        { label: "Concluído", value: completedProjects.toString(), icon: TrendingUp, color: "text-primary" },
    ];

    const recentProjects = projects.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                        Painel
                    </h1>
                    <p className="text-muted-foreground mt-1">Bem-vindo de volta, {user?.name}.</p>
                </div>
                <Button onClick={() => navigate('/projects')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Projeto
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.label} className="border-0 bg-gradient-to-br from-surface/50 to-surface/30 p-5">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}

                {/* Plan Usage Card */}
                <Card className="border-0 bg-gradient-to-br from-primary/20 to-surface/30 p-5">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Plano {user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Creator'}
                        </CardTitle>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {user?.plan === 'agency' ? 'Ilimitado' : `${user?.shortsUsage || 0}/${user?.plan === 'pro' ? 50 : 10} Shorts`}
                        </span>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="text-2xl font-bold text-foreground">
                                {user?.plan === 'agency' ? '∞' : (user?.plan === 'pro' ? 50 : 10) - (user?.shortsUsage || 0)}
                                <span className="text-sm font-normal text-muted-foreground ml-2">restantes</span>
                            </div>
                            {user?.plan !== 'agency' && (
                                <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${Math.min(100, ((user?.shortsUsage || 0) / (user?.plan === 'pro' ? 50 : 10)) * 100)}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-0">
                <CardHeader>
                    <CardTitle>Projetos Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8 text-muted-foreground">Carregando projetos...</div>
                    ) : recentProjects.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Nenhum projeto ainda. Crie seu primeiro projeto para começar!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border-0 hover:bg-surface/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Play className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground">{project.title}</h4>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(project.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'completed'
                                            ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                            : project.status === 'processing'
                                                ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                : 'bg-muted text-muted-foreground border border-border'
                                            }`}>
                                            {project.status}
                                        </span>
                                        {project.duration && (
                                            <span className="text-sm text-muted-foreground font-mono">{project.duration}</span>
                                        )}
                                        <Button variant="ghost" size="sm" onClick={() => navigate(`/editor/${project.id}`)}>
                                            Ver
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
