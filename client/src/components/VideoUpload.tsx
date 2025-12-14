import { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './ui/Button';

interface VideoUploadProps {
    onUpload: (file: File) => void;
    isUploading?: boolean;
    uploadProgress?: number;
}

export function VideoUpload({ onUpload, isUploading, uploadProgress }: VideoUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('video/')) {
                setSelectedFile(file);
            } else {
                alert('Please upload a video file');
            }
        }
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    }, []);

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
    };

    return (
        <div className="space-y-4">
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    onChange={handleChange}
                    className="hidden"
                />

                {!selectedFile ? (
                    <label htmlFor="video-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                                <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="text-center">
                                <p className="text-white font-medium">Drop your video here or click to browse</p>
                                <p className="text-sm text-gray-400 mt-1">Supports MP4, AVI, MOV, MKV (max 500MB)</p>
                            </div>
                        </div>
                    </label>
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Upload className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-white font-medium">{selectedFile.name}</p>
                                <p className="text-sm text-gray-400">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={clearFile}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>

            {selectedFile && !isUploading && (
                <Button onClick={handleUpload} className="w-full">
                    Upload Video
                </Button>
            )}

            {isUploading && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Uploading...</span>
                        <span className="text-white">{uploadProgress || 0}%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                        <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress || 0}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
