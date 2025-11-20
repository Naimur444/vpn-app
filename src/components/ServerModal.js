import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Animated, PanResponder } from 'react-native';
import { X, Search } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { ServerCard } from './ServerCard';

export const ServerModal = ({ visible, onClose, servers, selectedServer, onSelectServer }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [slideAnim] = useState(new Animated.Value(0));
    const [dragY] = useState(new Animated.Value(0));

    React.useEffect(() => {
        if (visible) {
            Animated.spring(slideAnim, {
                toValue: 1,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
            dragY.setValue(0);
        }
    }, [visible]);

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    dragY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    onClose();
                } else {
                    Animated.spring(dragY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    const filteredServers = servers.filter(server =>
        server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectServer = (server) => {
        onSelectServer(server);
        setSearchQuery('');
        onClose();
    };

    const translateY = Animated.add(
        slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [600, 0],
        }),
        dragY
    );

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <Animated.View
                    style={[
                        styles.modalContainer,
                        { transform: [{ translateY }] }
                    ]}
                    onStartShouldSetResponder={() => true}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View
                            style={styles.dragHandleWrapper}
                            {...panResponder.panHandlers}
                            collapsable={false}
                        >
                            <View style={styles.dragHandle} />
                        </View>
                        <View style={styles.headerContent}>
                            <Text style={styles.title}>Select server</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <X color={COLORS.textPrimary} size={24} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Search color="#888" size={20} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search location"
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {/* Server List */}
                    <ScrollView
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {filteredServers.map((server) => (
                            <ServerCard
                                key={server.id}
                                server={server}
                                isSelected={selectedServer.id === server.id}
                                onPress={() => handleSelectServer(server)}
                            />
                        ))}
                        <View style={styles.bottomSpacer} />
                    </ScrollView>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '90%',
        paddingBottom: 20,
    },
    header: {
        paddingTop: 12,
        paddingBottom: 16,
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#4E4E4E',
        borderRadius: 2,
    },
    dragHandleWrapper: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        alignSelf: 'center',
        marginBottom: 16,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        color: COLORS.textPrimary,
        fontSize: 20,
        fontWeight: '600',
    },
    closeButton: {
        padding: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundButton,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 20,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: 16,
        marginLeft: 12,
    },
    scrollView: {
        paddingTop: 8,
    },
    bottomSpacer: {
        height: 20,
    },
});
