import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (data: { email: string; password: string }) =>
        api.post('/auth/login', data),
    me: () => api.get('/auth/me'),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
        api.put('/auth/change-password', data),
};

// Projects API
export const projectsAPI = {
    getAll: () => api.get('/projects'),
    getById: (id: string) => api.get(`/projects/${id}`),
    create: (data: { title: string; description?: string; duration?: string; numberOfClips?: number }) =>
        api.post('/projects', data),
    update: (id: string, data: Partial<{ title: string; description: string; status: string; duration: string }>) =>
        api.put(`/projects/${id}`, data),
    delete: (id: string) => api.delete(`/projects/${id}`),
    uploadVideo: (id: string, file: File, onProgress?: (progress: number) => void) => {
        const formData = new FormData();
        formData.append('video', file);

        return api.post(`/projects/${id}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total && onProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);
                }
            },
        });
    },
};

// Admin API
export const adminAPI = {
    getAllUsers: () => api.get('/admin'),
    createUser: (data: { email: string; password: string; name: string }) =>
        api.post('/admin', data),
    deleteUser: (id: string) => api.delete(`/admin/${id}`),
};

// Processing API
export const processingAPI = {
    autoSilence: (projectId: string) => api.post(`/processing/auto-silence/${projectId}`),
    speed: (projectId: string, speed: number = 1.25) =>
        api.post(`/processing/speed/${projectId}`, { speed }),
    crop916: (projectId: string) => api.post(`/processing/crop-9-16/${projectId}`),
    trim: (projectId: string, startTime: number, duration: number) => api.post(`/processing/trim/${projectId}`, { startTime, duration }),
};
