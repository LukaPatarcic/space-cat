import React, { FC, useEffect } from 'react';
import { Image, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CrewMemberStackParamList } from '../types/router';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { showToast } from '../helpers/toast';
import { capitalize } from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';

type CrewMemberScreenRouteProp = RouteProp<CrewMemberStackParamList, 'CrewMember'>;
type CrewMemberScreenNavigationProp = NavigationProp<CrewMemberStackParamList, 'CrewMembers'>;

const androidPermissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

const iOSPermissions = [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    PERMISSIONS.IOS.MEDIA_LIBRARY,
];

const styles = StyleSheet.create({
    imageContainer: {
        height: 180,
        width: 180,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        borderRadius: 100,
        height: 180,
        width: 180,
    },
});

const CrewMemberPage: FC = () => {
    const navigation = useNavigation<CrewMemberScreenNavigationProp>();
    const {
        params: { crewMember },
    } = useRoute<CrewMemberScreenRouteProp>();

    useEffect(() => {
        requestMultiple(Platform.OS === 'ios' ? iOSPermissions : androidPermissions).then(
            (statuses) => {
                const granted = androidPermissions.every(
                    (permission) => statuses[permission] === 'granted',
                );
                if (!granted) {
                    showToast('You need to allow all permissions to access this page');
                    navigation.navigate('CrewMembers');
                }
            },
        );
    }, []);

    const onOpenLink = () => {
        Linking.openURL(crewMember.wikipedia).catch(() => {
            showToast('Could not open link');
        });
    };

    return (
        <View style={{ marginTop: 20, flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image
                        source={{ uri: crewMember.image }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>{crewMember.name}</Text>
                    <Text>{crewMember.agency}</Text>
                    <Text
                        style={{ textDecorationLine: 'underline', color: 'lightblue' }}
                        onPress={onOpenLink}
                    >
                        Wikipedia link
                    </Text>
                    <Text>
                        Status: {capitalize(crewMember.status)}{' '}
                        <Icon
                            name={
                                crewMember.status === 'active'
                                    ? 'checkmark-circle-sharp'
                                    : 'close-circle-sharp'
                            }
                            size={20}
                        />{' '}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default CrewMemberPage;
