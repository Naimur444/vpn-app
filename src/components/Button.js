import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { Crown, ChevronRight } from 'lucide-react-native';

export const PremiumButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.premiumButton} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Crown color="#FFD700" size={24} fill="#FFD700" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.premiumTitle}>Go Premium</Text>
                <Text style={styles.premiumSubtitle}>High speed connection</Text>
            </View>
            <ChevronRight color={COLORS.textPrimary} size={24} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    premiumButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundButton,
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 20,
        marginTop: 20,
    },
    iconContainer: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    premiumTitle: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    premiumSubtitle: {
        color: '#888',
        fontSize: 12,
    },
});
