import React, { FC } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { Rocket } from '@type/rocket';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface Props {
    rocket: Rocket;
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    container: {
        flex: 1,
        height: 300,
        marginTop: 6,
        marginBottom: 15,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 4,
        backgroundColor: '#fff',
    },
    textContainer: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
    },
});

const RocketsPage: FC<Props> = ({ rocket }) => {
    return (
        <View key={rocket.id} style={styles.container}>
            <ImageBackground
                source={{ uri: rocket.flickr_images[0] }}
                style={styles.image}
                resizeMethod="auto"
            />
            <View style={styles.textContainer}>
                <Text numberOfLines={1} style={styles.title}>
                    {rocket.name}
                </Text>
                <Text numberOfLines={3} style={styles.description}>
                    {rocket.description}
                </Text>
            </View>
        </View>
    );
};

export default RocketsPage;
