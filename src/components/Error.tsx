import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text>An error occurred while fetching your data...</Text>
        </View>
    );
};

export default Loading;
