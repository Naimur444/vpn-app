// Mock VPN data for demonstration

export const SERVERS = [
    {
        id: 1,
        country: 'United States',
        location: 'New York',
        flag: '🇺🇸',
        ping: 45,
        isPremium: false,
    },
    {
        id: 2,
        country: 'United Kingdom',
        location: 'London',
        flag: '🇬🇧',
        ping: 32,
        isPremium: false,
    },
    {
        id: 3,
        country: 'Germany',
        location: 'Frankfurt',
        flag: '🇩🇪',
        ping: 28,
        isPremium: false,
    },
    {
        id: 4,
        country: 'Japan',
        location: 'Tokyo',
        flag: '🇯🇵',
        ping: 120,
        isPremium: true,
    },
    {
        id: 5,
        country: 'Singapore',
        location: 'Singapore',
        flag: '🇸🇬',
        ping: 95,
        isPremium: true,
    },
    {
        id: 6,
        country: 'Canada',
        location: 'Toronto',
        flag: '🇨🇦',
        ping: 52,
        isPremium: false,
    },
    {
        id: 7,
        country: 'Australia',
        location: 'Sydney',
        flag: '🇦🇺',
        ping: 180,
        isPremium: true,
    },
    {
        id: 8,
        country: 'France',
        location: 'Paris',
        flag: '🇫🇷',
        ping: 35,
        isPremium: false,
    },
];

export const connectToVPN = async (serverId) => {
    // Simulate connection delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, serverId });
        }, 2000);
    });
};

export const disconnectFromVPN = async () => {
    // Simulate disconnection delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
};

export const getConnectionStats = () => {
    // Mock statistics
    return {
        uploadSpeed: '2.5 MB/s',
        downloadSpeed: '8.3 MB/s',
        duration: '00:45:32',
    };
};
