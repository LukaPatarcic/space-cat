import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { PRIMARY_COLOR } from '@constants/colors';
import { Crew } from '@type/crew';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    crewMember: Crew;
    onPress: () => void;
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    name: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    agencyContainer: {
        marginTop: 4,
    },
    agency: {
        color: 'gray',
        fontSize: 14,
    },
    textContainer: { marginLeft: 12 },
});

const RocketsPage: FC<Props> = ({ crewMember, onPress }) => {
    return (
        <TouchableWithoutFeedback key={crewMember.id} onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: crewMember.image }}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{crewMember.name}</Text>
                        <View style={styles.agencyContainer}>
                            <Text style={styles.agency}>{crewMember.agency}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Icon name="chevron-forward" size={30} color={PRIMARY_COLOR} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default RocketsPage;
