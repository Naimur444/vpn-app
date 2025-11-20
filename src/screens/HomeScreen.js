import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { ConnectionButton } from '../components/ConnectionButton';
import { ServerModal } from '../components/ServerModal';
import { StatsCard } from '../components/StatsCard';
import { PremiumButton } from '../components/Button';
import { ChevronDown, MapPin } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { SERVERS, connectToVPN, disconnectFromVPN, getConnectionStats } from '../utils/vpnService';

export const HomeScreen = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isDisconnecting, setIsDisconnecting] = useState(false);
    const [selectedServer, setSelectedServer] = useState(SERVERS[0]);
    const [showServerModal, setShowServerModal] = useState(false);
    const [stats, setStats] = useState({
        uploadSpeed: '0 MB/s',
        downloadSpeed: '0 MB/s',
        duration: '00:00:00',
    });

    const handleConnectionToggle = async () => {
        if (isConnected) {
            // Disconnect
            setIsDisconnecting(true);
            await disconnectFromVPN();
            setTimeout(() => {
                setIsConnected(false);
                setIsDisconnecting(false);
            }, 1500); // Wait for water drain animation
            setStats({
                uploadSpeed: '0 MB/s',
                downloadSpeed: '0 MB/s',
                duration: '00:00:00',
            });
        } else {
            // Connect
            setIsConnecting(true);
            await connectToVPN(selectedServer);
            setTimeout(() => {
                setIsConnected(true);
                setIsConnecting(false);
                // Simulate stats update
                const newStats = getConnectionStats();
                setStats(newStats);
            }, 2000); // Wait for water fill animation
        }
    };

    const handleServerSelect = (server) => {
        setSelectedServer(server);
    };

    const handlePremiumPress = () => {
        // Navigate to premium screen or show premium modal
        console.log('Premium button pressed');
    };

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Connection Status */}
                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>
                        {isConnected ? 'Protected' : 'Not Protected'}
                    </Text>
                    <Text style={styles.ipAddress}>
                        {isConnected ? '••• •••• ••••' : 'Your IP is exposed'}
                    </Text>
                </View>

                {/* Connection Button */}
                <ConnectionButton
                    isConnected={isConnected}
                    isConnecting={isConnecting}
                    isDisconnecting={isDisconnecting}
                    onPress={handleConnectionToggle}
                />

                {/* Current Server */}
                <View style={styles.currentServerContainer}>
                    <View style={styles.currentServerHeader}>
                        <MapPin color={COLORS.textPurple} size={20} />
                        <Text style={styles.currentServerLabel}>Current Server</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.currentServerButton}
                        onPress={() => !isConnected && setShowServerModal(true)}
                        disabled={isConnected}
                    >
                        <View style={styles.serverInfo}>
                            <Text style={styles.serverFlag}>{selectedServer.flag}</Text>
                            <View>
                                <Text style={styles.serverCountry}>{selectedServer.country}</Text>
                                <Text style={styles.serverLocation}>{selectedServer.location}</Text>
                            </View>
                        </View>
                        {!isConnected && (
                            <ChevronDown color={COLORS.textPrimary} size={24} />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Statistics */}
                {isConnected && (
                    <StatsCard
                        uploadSpeed={stats.uploadSpeed}
                        downloadSpeed={stats.downloadSpeed}
                        duration={stats.duration}
                    />
                )}

                {/* Premium Button */}
                <PremiumButton onPress={handlePremiumPress} />
            </ScrollView>

            {/* Server Selection Modal */}
            <ServerModal
                visible={showServerModal && !isConnected}
                onClose={() => setShowServerModal(false)}
                servers={SERVERS}
                selectedServer={selectedServer}
                onSelectServer={handleServerSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    statusContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    statusLabel: {
        color: COLORS.textPrimary,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    ipAddress: {
        color: '#888',
        fontSize: 14,
    },
    currentServerContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    currentServerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    currentServerLabel: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    currentServerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.backgroundButton,
        borderRadius: 12,
        padding: 16,
    },
    serverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    serverFlag: {
        fontSize: 32,
    },
    serverCountry: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    serverLocation: {
        color: '#888',
        fontSize: 13,
        marginTop: 2,
    },
});
