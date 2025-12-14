import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Upload as UploadIcon } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { VideoUpload } from "../components/VideoUpload";
import { Timeline } from "../components/editor/Timeline";
import { VideoControls } from "../components/editor/VideoControls";
import { projectsAPI, processingAPI } from "../lib/api";

const API_BASE = 'http://localhost:3000';

export default function Editor() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showUpload, setShowUpload] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);

    const [selectedClip, setSelectedClip] = useState<{ startTime: number, duration: number, index: number } | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);

    // Video State
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        if (projectId && projectId !== 'new') {
            loadProject();
            // Poll for updates if processing
            const interval = setInterval(() => {
                if (project?.status === 'processing') {
                    loadProject();
                }
            }, 2000);
            return () => clearInterval(interval);
        } else {
            setIsLoading(false);
        }
    }, [projectId, project?.status]);

    const loadProject = async () => {
        try {
            const response = await projectsAPI.getById(projectId!);
            setProject(response.data);
            setShowUpload(!response.data.videoPath);
        } catch (error) {
            console.error('Failed to load project:', error);
            toast.error('Falha ao carregar projeto');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVideoUpload = async (file: File) => {
        if (!projectId || projectId === 'new') return;

        setIsUploading(true);
        try {
            await projectsAPI.uploadVideo(projectId, file, (progress) => {
                setUploadProgress(progress);
            }).then(response => {
                setProject(response.data);
            });

            setShowUpload(false);
            toast.success('Vídeo enviado com sucesso!');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Falha no envio');
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleProcess = async (type: 'auto-silence' | 'captions' | 'crop-9-16' | 'speed') => {
        if (!projectId || projectId === 'new') return;

        setIsProcessing(true);

        try {
            if (type === 'auto-silence') {
                await processingAPI.autoSilence(projectId);
            } else if (type === 'speed') {
                await processingAPI.speed(projectId, 1.25);
            } else if (type === 'crop-9-16') {
                await processingAPI.crop916(projectId);
            }

            toast.info(`Processamento iniciado! Isso pode levar alguns minutos.`);
            // Reload project to see processing status
            setTimeout(() => loadProject(), 500);
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Falha no processamento');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDiscard = async () => {
        if (!projectId || projectId === 'new') return;

        try {
            await projectsAPI.delete(projectId);
            toast.success('Projeto deletado com sucesso');
            navigate('/projects');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.error || 'Falha ao deletar projeto');
        }
    };

    const handleDownload = async () => {
        const videoUrl = getFullUrl(project?.videoUrl);

        if (!videoUrl) {
            toast.warning('Nenhum vídeo processado disponível para baixar');
            return;
        }

        try {
            toast.info('Preparando download...', { autoClose: 2000 });

            const response = await fetch(videoUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${project?.title || 'video'}-processed.mp4`;

            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success('Download iniciado!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Não foi possível iniciar o download automático. O vídeo será aberto em uma nova aba.');
            // Fallback
            window.open(videoUrl, '_blank');
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimelineSeek = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (newVolume: number) => {
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
        }
    };

    const toggleFullscreen = () => {
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.parentElement?.requestFullscreen();
            }
        }
    };

    if (isLoading) {
        return <div className="text-white">Carregando...</div>;
    }

    const getFullUrl = (path: string | null) => {
        if (!path) return null;
        if (path.startsWith('http') || path.startsWith('https')) return path;
        return `${API_BASE}${path}`;
    };

    const videoUrl = getFullUrl(project?.videoUrl);
    const hasVideo = !!project?.videoPath;

    return (
        <div className="flex flex-col gap-6 h-full">
            <Modal
                isOpen={showDiscardModal}
                onClose={() => setShowDiscardModal(false)}
                onConfirm={handleDiscard}
                title="Descartar Projeto"
                description="Tem certeza que deseja descartar este projeto? Esta ação não pode ser desfeita e todos os dados serão permanentemente excluídos."
                confirmText="Deletar"
                cancelText="Cancelar"
                variant="danger"
            />

            {/* Clip Preview Modal */}
            <Modal
                isOpen={!!selectedClip}
                onClose={() => {
                    setSelectedClip(null);
                    setPreviewUrl(null);
                }}
                title={`Preview do Corte ${selectedClip ? selectedClip.index + 1 : ''}`}
                confirmText={isProcessing ? "Processando..." : "Baixar Corte"}
                cancelText="Fechar"
                onConfirm={async () => {
                    if (!selectedClip || isProcessing || !previewUrl) return;
                    try {
                        // Download the already generated preview
                        const link = document.createElement('a');
                        link.href = getFullUrl(previewUrl)!;
                        link.download = `corte-${selectedClip.index + 1}.mp4`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        toast.success('Download iniciado!');
                    } catch (err) {
                        console.error(err);
                        toast.error('Erro ao baixar corte');
                    }
                }}
            >
                <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                    {isPreviewLoading ? (
                        <div className="text-white">Gerando preview...</div>
                    ) : (
                        selectedClip && previewUrl && (
                            <video
                                src={getFullUrl(previewUrl)!}
                                controls
                                className="w-full h-full"
                                autoPlay
                            />
                        )
                    )}
                </div>
            </Modal>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {project?.title || 'Novo Projeto (Sem Título)'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {project?.status === 'processing'
                            ? `Processando: ${project.processingProgress || 0}%`
                            : project?.status || 'Rascunho'}
                    </p>
                </div>
                <div className="flex gap-2">
                    {hasVideo && (
                        <Button variant="ghost" onClick={() => setShowUpload(true)}>
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Re-enviar
                        </Button>
                    )}
                    <Button variant="ghost" onClick={() => setShowDiscardModal(true)}>
                        Descartar
                    </Button>
                    {videoUrl && (
                        <Button onClick={handleDownload}>
                            Baixar
                        </Button>
                    )}
                </div>
            </div>

            {showUpload ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <VideoUpload
                            onUpload={handleVideoUpload}
                            isUploading={isUploading}
                            uploadProgress={uploadProgress}
                        />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1 flex flex-col gap-6 lg:min-h-0">
                        {/* Main Content Area: Video + Tools */}
                        <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:min-h-0">
                            {/* Video Player Area */}
                            <div className="flex-grow bg-muted/30 rounded-xl border border-border relative group overflow-hidden flex items-center justify-center backdrop-blur-sm">
                                {videoUrl ? (
                                    <>
                                        <video
                                            ref={videoRef}
                                            src={videoUrl}
                                            className="max-w-full max-h-full shadow-2xl"
                                            key={videoUrl}
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                            onPlay={() => setIsPlaying(true)}
                                            onPause={() => setIsPlaying(false)}
                                            onClick={togglePlay}
                                        />
                                        <VideoControls
                                            isPlaying={isPlaying}
                                            onPlayPause={togglePlay}
                                            volume={volume}
                                            onVolumeChange={handleVolumeChange}
                                            onFullscreen={toggleFullscreen}
                                            currentTime={currentTime}
                                            duration={duration}
                                        />
                                    </>
                                ) : (
                                    <div className="text-gray-500">Nenhum vídeo enviado</div>
                                )}

                                {project?.status === 'processing' && (
                                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                                        <div className="text-center">
                                            <div className="text-white text-lg mb-2">Processando...</div>
                                            <div className="w-64 bg-white/10 rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${project.processingProgress || 0}%` }}
                                                />
                                            </div>
                                            <div className="text-gray-400 text-sm mt-2">{project.processingProgress || 0}%</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Tools - Responsive Width */}
                            <div className="w-full lg:w-80 flex-shrink-0 bg-card border border-border rounded-xl p-4 flex flex-col gap-4 overflow-y-auto h-[500px] lg:h-auto lg:max-h-[600px]">
                                <h3 className="font-medium text-foreground">Ferramentas IA</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleProcess('auto-silence')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Remoção de Silêncio</div>
                                        <p className="text-xs text-muted-foreground">Detectar e remover partes silenciosas</p>
                                    </button>

                                    <button
                                        onClick={() => handleProcess('crop-9-16')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Corte Inteligente 9:16</div>
                                        <p className="text-xs text-muted-foreground">Converter horizontal para vertical</p>
                                    </button>

                                    <button
                                        onClick={() => handleProcess('speed')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Viral Speed (Acelerar)</div>
                                        <p className="text-xs text-muted-foreground">Acelerar vídeo em 1.25x para maior retenção</p>
                                    </button>

                                    <button
                                        onClick={() => toast.info('Em breve: Detector de Ganchos Virais!')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Detector de Ganchos (Viral)</div>
                                        <p className="text-xs text-muted-foreground">Identifica os melhores momentos para viralizar</p>
                                    </button>

                                    <button
                                        onClick={() => toast.info('Em breve: Legendas Karaokê!')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Legendas Dinâmicas (Karaokê)</div>
                                        <p className="text-xs text-muted-foreground">Legendas animadas palavra por palavra</p>
                                    </button>

                                    <button
                                        onClick={() => toast.info('Em breve: Magic Zoom!')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Magic Zoom (Retenção)</div>
                                        <p className="text-xs text-muted-foreground">Zooms automáticos para prender atenção</p>
                                    </button>

                                    <button
                                        onClick={() => toast.info('Em breve: Dublagem IA!')}
                                        disabled={!hasVideo || isProcessing || project?.status === 'processing'}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Dublagem IA (Smart Voice Over)</div>
                                        <p className="text-xs text-muted-foreground">Traduza e duble seu vídeo automaticamente</p>
                                    </button>

                                    <button
                                        onClick={() => toast.info('Em breve: Integração Zapier!')}
                                        className="w-full p-3 bg-muted/50 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors text-left group"
                                    >
                                        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Integração Zapier/Webhooks</div>
                                        <p className="text-xs text-muted-foreground">Conecte com TikTok, Instagram e YouTube</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Area - Fixed Height at Bottom */}
                        <div className="h-32 lg:h-48 flex-shrink-0 mt-auto">
                            <Timeline
                                currentTime={currentTime}
                                duration={duration}
                                onSeek={handleTimelineSeek}
                            />
                        </div>

                        {/* Viral Clips Section */}
                        {hasVideo && duration > 0 && (
                            <div className="bg-card border border-border rounded-xl p-6">
                                <h3 className="font-bold text-foreground mb-4">Cortes Virais</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {Array.from({ length: project?.numberOfClips || 10 }).map((_, i) => {
                                        const clipDuration = Math.floor(duration / 10);
                                        const startTime = i * clipDuration;
                                        return (
                                            <div key={i} className="bg-surface rounded-lg p-3 border border-border flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                                                <div className="aspect-video bg-black/50 rounded flex items-center justify-center text-xs text-muted-foreground relative overflow-hidden">
                                                    {videoUrl && (
                                                        <video
                                                            src={`${videoUrl}#t=${startTime},${startTime + clipDuration}`}
                                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                                                            preload="metadata"
                                                        />
                                                    )}
                                                    <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white drop-shadow-md">
                                                        Corte {i + 1}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>{Math.floor(startTime / 60)}:{Math.floor(startTime % 60).toString().padStart(2, '0')} - {Math.floor((startTime + clipDuration) / 60)}:{Math.floor((startTime + clipDuration) % 60).toString().padStart(2, '0')}</span>
                                                    <span>{Math.floor(clipDuration)}s</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    className="w-full"
                                                    onClick={async () => {
                                                        const clipData = { startTime, duration: clipDuration, index: i };
                                                        setSelectedClip(clipData);
                                                        setIsPreviewLoading(true);
                                                        try {
                                                            const response = await processingAPI.trim(projectId!, startTime, clipDuration);
                                                            setPreviewUrl(response.data.videoUrl);
                                                        } catch (err) {
                                                            console.error(err);
                                                            toast.error('Erro ao gerar preview');
                                                            setSelectedClip(null);
                                                        } finally {
                                                            setIsPreviewLoading(false);
                                                        }
                                                    }}
                                                >
                                                    Visualizar
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )
            }
        </div>
    );
}
