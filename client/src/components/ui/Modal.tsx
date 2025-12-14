import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    children?: React.ReactNode;
}

export function Modal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'primary',
    children
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-surface border border-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
                {description && <p className="text-muted-foreground mb-6">{description}</p>}

                {children}

                {(onConfirm || !children) && (
                    <div className="flex gap-3 justify-end mt-6">
                        <Button variant="ghost" onClick={onClose}>
                            {cancelText}
                        </Button>
                        {onConfirm && (
                            <Button
                                variant={variant === 'danger' ? 'danger' : 'primary'}
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                {confirmText}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
