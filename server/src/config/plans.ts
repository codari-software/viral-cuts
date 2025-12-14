export const PLANS = {
    creator: {
        name: 'Creator',
        shortsLimit: 10,
        resolution: '720p',
        features: ['Hook Detector', 'Exportação Otimizada']
    },
    pro: {
        name: 'Pro',
        shortsLimit: 50,
        resolution: '1080p',
        features: ['Hook Detector', 'Exportação Otimizada', 'Legendas Dinâmicas']
    },
    agency: {
        name: 'Agency',
        shortsLimit: 9999, // Unlimited essentially
        resolution: '4K',
        features: ['Hook Detector', 'Exportação Otimizada', 'Legendas Dinâmicas', 'Dublagem IA']
    }
};

export type PlanType = keyof typeof PLANS;
