import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Check, Crown, Wifi } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

export const ServerCard = ({ server, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                isSelected && styles.cardSelected,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.leftContent}>
                <View style={styles.flagContainer}>
                    <Text style={styles.flag}>{server.flag}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.nameRow}>
                        <Text style={styles.countryName}>{server.country}</Text>
                        {server.isPremium && (
                            <Crown color="#FFD700" size={16} fill="#FFD700" />
                        )}
                    </View>
                    <View style={styles.detailsRow}>
                        <Wifi color="#888" size={14} />
                        <Text style={styles.ping}>{server.ping}ms</Text>
                        <Text style={styles.separator}>•</Text>
                        <Text style={styles.location}>{server.location}</Text>
                    </View>
                </View>
            </View>
            {isSelected && (
                <View style={styles.checkContainer}>
                    <Check color={COLORS.textPurple} size={24} strokeWidth={3} />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.backgroundButton,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginVertical: 6,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: COLORS.textPurple,
        backgroundColor: '#3A3A3A',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    flagContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    flag: {
        fontSize: 28,
    },
    infoContainer: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    countryName: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    ping: {
        color: '#888',
        fontSize: 13,
    },
    separator: {
        color: '#666',
        fontSize: 13,
    },
    location: {
        color: '#888',
        fontSize: 13,
    },
    checkContainer: {
        marginLeft: 12,
    },
});
