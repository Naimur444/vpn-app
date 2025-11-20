import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUp, ArrowDown, Clock } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

export const StatsCard = ({ uploadSpeed, downloadSpeed, duration }) => {
    return (
        <View style={styles.container}>
            <View style={styles.statItem}>
                <ArrowUp color={COLORS.textPurple} size={18} />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Upload</Text>
                    <Text style={styles.value}>{uploadSpeed}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
                <ArrowDown color={COLORS.textPurple} size={18} />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Download</Text>
                    <Text style={styles.value}>{downloadSpeed}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
                <Clock color={COLORS.textPurple} size={18} />
                <View style={styles.textContainer}>
                    <Text style={styles.label}>Duration</Text>
                    <Text style={styles.value}>{duration}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.backgroundButton,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginHorizontal: 20,
        marginVertical: 12,
        alignItems: 'center',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 8,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        color: '#888',
        fontSize: 11,
        marginBottom: 2,
    },
    value: {
        color: COLORS.textPrimary,
        fontSize: 13,
        fontWeight: '600',
    },
    divider: {
        width: 1,
        height: 32,
        backgroundColor: COLORS.strokeButton,
        marginHorizontal: 10,
    },
});
