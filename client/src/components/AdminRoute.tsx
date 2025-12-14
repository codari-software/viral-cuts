import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Debug log to see exactly what's failing
    console.log('[AdminRoute] Check:', {
        email: user.email,
        expected: 'admin@codariapp.com.br',
        match: user.email?.toLowerCase() === 'admin@codariapp.com.br'
    });

    if (user.email?.toLowerCase() !== 'admin@codariapp.com.br') {
        toast.error(`Acesso negado para: ${user.email}`);
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
