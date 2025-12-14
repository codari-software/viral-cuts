import { memo } from 'react';
import { Button } from "../ui/Button";

interface ClipsGridProps {
    numberOfClips: number;
    duration: number;
    videoUrl: string | null;
    onPreview: (startTime: number, duration: number, index: number) => void;
}

export const ClipsGrid = memo(({ numberOfClips, duration, videoUrl, onPreview }: ClipsGridProps) => {
    // If no video or duration, don't render anything useful (or render placeholder)
    if (!videoUrl || duration <= 0) return null;

    return (
        <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-bold text-foreground mb-4">Cortes Virais</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: numberOfClips || 10 }).map((_, i) => {
                    const clipDuration = Math.floor(duration / 10);
                    const startTime = i * clipDuration;

                    return (
                        <div key={i} className="bg-surface rounded-lg p-3 border border-border flex flex-col gap-3 group hover:border-primary/50 transition-colors">
                            <div className="aspect-video bg-black/50 rounded flex items-center justify-center text-xs text-muted-foreground relative overflow-hidden">
                                <video
                                    src={`${videoUrl}#t=${startTime},${startTime + clipDuration}`}
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                                    preload="metadata"
                                />
                                <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-white drop-shadow-md">
                                    Corte {i + 1}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>
                                    {Math.floor(startTime / 60)}:{Math.floor(startTime % 60).toString().padStart(2, '0')} -
                                    {Math.floor((startTime + clipDuration) / 60)}:{Math.floor((startTime + clipDuration) % 60).toString().padStart(2, '0')}
                                </span>
                                <span>{Math.floor(clipDuration)}s</span>
                            </div>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="w-full"
                                onClick={() => onPreview(startTime, clipDuration, i)}
                            >
                                Visualizar
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

ClipsGrid.displayName = 'ClipsGrid';
