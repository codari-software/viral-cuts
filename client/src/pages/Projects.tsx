import { useState } from "react";
import { toast } from 'react-toastify';
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Modal } from "../components/ui/Modal";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Plus, Play, Trash2, Search, Filter } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useNavigate } from "react-router-dom";

export default function Projects() {
    const { refreshUser } = useAuth();
    const { projects, isLoading, createProject, deleteProject } = useProjects();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [numberOfClips, setNumberOfClips] = useState("10");
    const [isCreating, setIsCreating] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            // @ts-ignore - numberOfClips argument type might be missing in hook definition
            const project = await createProject({ title, description, numberOfClips: parseInt(numberOfClips) });
            setTitle("");
            setDescription("");
            setNumberOfClips("10");
            setShowCreateForm(false);

            // Refresh user limits
            await refreshUser();

            toast.success('Projeto criado com sucesso!');
            // navigate(`/editor/${project.id}`); // Stay on page to see list update

        } catch (error: any) {
            console.error(error); // Added from the snippet
            toast.error(error.message || 'Falha ao criar projeto'); // Original error message
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteProjectId) return;

        try {
            await deleteProject(deleteProjectId);
            toast.success('Projeto deletado com sucesso');
        } catch (error: any) {
            toast.error(error.message || 'Falha ao deletar projeto');
        }
    };

    return (
        <div className="space-y-8">
            <Modal
                isOpen={!!deleteProjectId}
                onClose={() => setDeleteProjectId(null)}
                onConfirm={handleDeleteConfirm}
                title="Deletar Projeto"
                description="Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita."
                confirmText="Deletar"
                cancelText="Cancelar"
                variant="danger"
            />

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
                <Button onClick={() => setShowCreateForm(!showCreateForm)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Projeto
                </Button>
            </div>

            {showCreateForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>Criar Novo Projeto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <Input
                                label="Título do Projeto"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Meu Vídeo Incrível"
                                required
                            />
                            <Input
                                label="Descrição (opcional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Uma breve descrição..."
                            />
                            <Input
                                label="Quantidade de Cortes"
                                value={numberOfClips}
                                onChange={(e) => setNumberOfClips(e.target.value)}
                                placeholder="10"
                                type="number"
                                min="1"
                            />
                            <div className="flex gap-2">
                                <Button type="submit" isLoading={isCreating}>
                                    Criar Projeto
                                </Button>
                                <Button type="button" variant="ghost" onClick={() => setShowCreateForm(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {isLoading ? (
                <div className="grid place-items-center h-96 border-2 border-dashed border-border rounded-xl bg-muted/20">
                    <div className="text-center">
                        <p className="text-muted-foreground">Carregando projetos...</p>
                    </div>
                </div>
            ) : projects.length === 0 ? (
                <div className="grid place-items-center h-96 border-2 border-dashed border-border rounded-xl bg-muted/20">
                    <div className="text-center">
                        <p className="text-muted-foreground">Nenhum projeto encontrado. Comece a criar!</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="hover:border-primary/20 transition-all cursor-pointer group">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="group-hover:text-primary transition-colors text-foreground">
                                            {project.title}
                                        </CardTitle>
                                        {project.description && (
                                            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDeleteProjectId(project.id);
                                        }}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'completed'
                                            ? 'bg-secondary/10 text-secondary border border-secondary/20'
                                            : project.status === 'processing'
                                                ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    {project.duration && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Duração</span>
                                            <span className="text-foreground font-mono">{project.duration}</span>
                                        </div>
                                    )}
                                    {project.processingProgress !== undefined && project.status === 'processing' && (
                                        <div>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">Progresso</span>
                                                <span className="text-foreground">{project.processingProgress}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${project.processingProgress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <Button
                                        variant="ghost"
                                        className="w-full mt-2"
                                        onClick={() => navigate(`/editor/${project.id}`)}
                                    >
                                        <Play className="mr-2 h-4 w-4" />
                                        Abrir Editor
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
