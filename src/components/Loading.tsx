import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { PRIMARY_COLOR } from '../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={60} color={PRIMARY_COLOR} />
        </View>
    );
};

export default Loading;
