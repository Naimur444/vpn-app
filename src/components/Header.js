import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, Settings } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

export const Header = () => {
    return (
        <View style={styles.header}>
            <TouchableOpacity>
                <Menu color={COLORS.textPrimary} size={32} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Settings color={COLORS.textPrimary} size={28} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.background,
    },
});
