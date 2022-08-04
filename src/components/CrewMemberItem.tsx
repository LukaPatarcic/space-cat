import React, { FC } from 'react';
import { StyleSheet, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Crew } from '../types/crew';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_COLOR } from '../constants/colors';
interface Props {
    crewMember: Crew;
    onPress: () => void;
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        shadowColor: Colors.shadowColor,
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
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: Colors.history_back,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    name: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    agencyContainer: {
        marginTop: 4,
    },
    agency: {
        color: Colors.gray,
        fontSize: 12,
    },
});

const RocketsPage: FC<Props> = ({ crewMember, onPress }) => {
    return (
        <TouchableWithoutFeedback key={crewMember.id} onPress={onPress}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: crewMember.image }}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    <View style={{ marginLeft: 12 }}>
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
