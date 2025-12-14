import * as React from "react"
import { cn } from "../../lib/utils"

// I'm skipping Radix Slot dependence for now to keep it simple unless needed, 
// no wait, I didn't install class-variance-authority or radix-slot. 
// I'll stick to simple props for now to avoid installing more deps if I don't need them yet. 
// Actually, standard modern react setup uses cva. I should stick to simple for speed unless I added it.
// I did NOT add cva in the install step.
// I will implement a simpler Button.

import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
            secondary: "bg-secondary text-white hover:bg-secondary/90",
            danger: "bg-red-500 text-white hover:bg-red-600",
            ghost: "hover:bg-accent hover:text-accent-foreground text-foreground/70",
            outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground text-foreground",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-6 text-lg",
            icon: "h-10 w-10 p-2",
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || disabled}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"
