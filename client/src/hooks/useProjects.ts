import { useState, useEffect } from 'react';
import { projectsAPI } from '../lib/api';

interface Project {
    id: string;
    title: string;
    description?: string;
    status: 'draft' | 'processing' | 'completed' | 'failed';
    duration?: string;
    createdAt: string;
    processingProgress?: number;
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const response = await projectsAPI.getAll();
            setProjects(response.data);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to fetch projects');
        } finally {
            setIsLoading(false);
        }
    };

    const createProject = async (data: { title: string; description?: string; duration?: string }) => {
        try {
            const response = await projectsAPI.create(data);
            setProjects(prev => [response.data, ...prev]);
            return response.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.error || 'Failed to create project');
        }
    };

    const deleteProject = async (id: string) => {
        try {
            await projectsAPI.delete(id);
            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err: any) {
            throw new Error(err.response?.data?.error || 'Failed to delete project');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        isLoading,
        error,
        refetch: fetchProjects,
        createProject,
        deleteProject,
    };
}
