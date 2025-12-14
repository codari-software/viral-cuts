import { useRef } from 'react';
import type { MouseEvent } from 'react';

interface TimelineProps {
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
}

export function Timeline({ currentTime, duration, onSeek }: TimelineProps) {
    const timelineRef = useRef<HTMLDivElement>(null);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Zoom level (pixels per second)
    const PIXELS_PER_SECOND = 20;

    // Generate ruler ticks (every 5 seconds)
    const ticks: number[] = [];
    if (duration > 0) {
        const step = duration > 60 ? 10 : 5; // Adjust tick interval based on duration
        for (let i = 0; i <= duration; i += step) {
            ticks.push(i);
        }
    }

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="h-full bg-card border border-border rounded-xl flex flex-col overflow-hidden select-none">
            {/* Header */}
            <div className="h-8 border-b border-border bg-muted/30 px-4 flex items-center justify-between flex-shrink-0 z-10">
                <span className="text-xs font-mono text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>

            {/* Scrollable Timeline Area */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden relative custom-scrollbar">
                <div
                    ref={timelineRef}
                    className="h-full relative cursor-pointer group"
                    style={{ width: `${Math.max(100, duration * 10)}%`, minWidth: '100%' }} // Simple scaling for now or use fixed pixels
                    onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
                        if (!timelineRef.current || duration === 0) return;
                        const rect = timelineRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const validX = Math.max(0, Math.min(x, rect.width));
                        const newTime = (validX / rect.width) * duration;
                        onSeek(newTime);
                    }}
                    onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
                        if (e.buttons !== 1) return;
                        if (!timelineRef.current || duration === 0) return;
                        const rect = timelineRef.current.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const validX = Math.max(0, Math.min(x, rect.width));
                        const newTime = (validX / rect.width) * duration;
                        onSeek(newTime);
                    }}
                >
                    {/* Ruler */}
                    <div className="h-6 bg-muted/50 border-b border-border relative">
                        {ticks.map(tick => (
                            <div
                                key={tick}
                                className="absolute top-0 bottom-0 border-l border-muted-foreground/30 text-[10px] text-muted-foreground pl-1 pt-1"
                                style={{ left: `${(tick / duration) * 100}%` }}
                            >
                                {formatTime(tick)}
                            </div>
                        ))}
                    </div>

                    {/* Tracks Area */}
                    <div className="p-2 space-y-2 relative">
                        {/* Video Track */}
                        <div className="h-16 bg-primary/10 rounded-lg border border-primary/20 relative overflow-hidden flex items-center">
                            <span className="ml-2 text-xs font-medium text-primary z-10 sticky left-2">Video Track 1</span>
                        </div>
                        {/* Audio Track */}
                        <div className="h-12 bg-blue-500/10 rounded-lg border border-blue-500/20 relative overflow-hidden flex items-center">
                            <span className="ml-2 text-xs font-medium text-blue-500 z-10 sticky left-2">Audio Track 1</span>
                        </div>
                    </div>

                    {/* Playhead */}
                    <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
                        style={{ left: `${progressPercent}%` }}
                    >
                        <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 transform rotate-45" />
                    </div>
                </div>
            </div>
        </div>
    );
}
