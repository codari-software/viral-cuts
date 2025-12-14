import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from "../ui/Button";

interface VideoControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
    onFullscreen: () => void;
    currentTime: number;
    duration: number;
}

export function VideoControls({
    isPlaying,
    onPlayPause,
    volume,
    onVolumeChange,
    onFullscreen,
    currentTime,
    duration
}: VideoControlsProps) {

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPlayPause}
                    className="text-white hover:bg-white/20"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>

                <div className="flex items-center gap-2 group/volume relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
                        className="text-white hover:bg-white/20"
                    >
                        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                    <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                            className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                        />
                    </div>
                </div>

                <span className="text-white/90 text-sm font-medium tabular-nums shadow-black drop-shadow-md">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={onFullscreen}
                className="text-white hover:bg-white/20"
            >
                <Maximize size={20} />
            </Button>
        </div>
    );
}
