import React, { FC } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { PRIMARY_COLOR } from '@constants/colors';

interface Props {
    message: string;
    refetch: () => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    image: { width: 300, height: 300 },
});

const Error: FC<Props> = ({ refetch, message }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/cat_error.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.text}>{message}</Text>
            <Button title="Retry" onPress={refetch} color={PRIMARY_COLOR} />
        </View>
    );
};

export default Error;
