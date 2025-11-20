import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Power } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

export const ConnectionButton = ({ isConnected, isConnecting, isDisconnecting, onPress }) => {
    const [scaleAnim] = React.useState(new Animated.Value(1));
    const [fillAnim] = React.useState(new Animated.Value(0));
    const [shakeAnim] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
        if (isConnecting) {
            // Start water filling animation from bottom to top
            Animated.parallel([
                Animated.timing(fillAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                // Water shake effect
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(shakeAnim, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(shakeAnim, {
                            toValue: -1,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                        Animated.timing(shakeAnim, {
                            toValue: 0,
                            duration: 400,
                            useNativeDriver: true,
                        }),
                    ])
                ),
            ]).start();
        } else if (isDisconnecting) {
            // Drain water from top to bottom
            Animated.timing(fillAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }).start();
        } else if (isConnected) {
            // Keep filled when connected
            fillAnim.setValue(1);
            shakeAnim.setValue(0);
        } else {
            // Reset when disconnected
            fillAnim.setValue(0);
            shakeAnim.setValue(0);
        }
    }, [isConnecting, isDisconnecting, isConnected]);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getButtonContent = () => {
        if (isDisconnecting) {
            return {
                text: 'Disconnecting...',
                subtext: 'Please wait',
            };
        }
        if (isConnecting) {
            return {
                text: 'Connecting...',
                subtext: 'Please wait',
            };
        }
        if (isConnected) {
            return {
                text: 'Connected',
                subtext: 'Tap to disconnect',
            };
        }
        return {
            text: 'Tap to Connect',
            subtext: 'Secure your connection',
        };
    };

    const content = getButtonContent();

    // Water fill animation - translate from bottom to top
    const waterTranslateY = fillAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [180, 0], // Start below button (180px down), move to top (0)
    });

    // Water shake animation
    const shakeTranslate = shakeAnim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-3, 0, 3],
    });

    const showWater = isConnecting || isDisconnecting || isConnected;

    return (
        <View style={styles.container}>
            <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
                <TouchableOpacity
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={0.9}
                    disabled={isConnecting || isDisconnecting}
                    style={styles.buttonWrapper}
                >
                    {/* Background circle */}
                    <View style={[
                        styles.button,
                        !showWater && styles.buttonDisconnected
                    ]}>
                        {/* Water filling effect */}
                        {showWater && (
                            <Animated.View
                                style={[
                                    styles.waterFill,
                                    {
                                        transform: [
                                            { translateY: waterTranslateY },
                                            { translateX: shakeTranslate }
                                        ]
                                    }
                                ]}
                            >
                                <LinearGradient
                                    colors={COLORS.linearGradient}
                                    style={styles.waterGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                />
                            </Animated.View>
                        )}

                        {/* Icon */}
                        <View style={styles.iconContainer}>
                            <Power
                                color={showWater ? COLORS.textPrimary : COLORS.textPurple}
                                size={64}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
            <Text style={styles.statusText}>{content.text}</Text>
            <Text style={styles.subtextText}>{content.subtext}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 40,
    },
    buttonWrapper: {
        width: 180,
        height: 180,
    },
    button: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    buttonDisconnected: {
        backgroundColor: '#3A3A3A',
    },
    waterFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 180,
    },
    waterGradient: {
        width: '100%',
        height: '100%',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    statusText: {
        color: COLORS.textPrimary,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
    },
    subtextText: {
        color: '#888',
        fontSize: 14,
        marginTop: 8,
    },
});
