import React, { FC, useEffect } from 'react';
import { Image, Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { CrewMemberStackParamList } from '../types/router';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { showToast } from '../helpers/toast';
import { capitalize } from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import { TEXTS } from '../constants/texts';
import Clipboard from '@react-native-clipboard/clipboard';

type CrewMemberScreenRouteProp = RouteProp<CrewMemberStackParamList, 'CrewMember'>;
type CrewMemberScreenNavigationProp = NavigationProp<CrewMemberStackParamList, 'CrewMembers'>;

const androidPermissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];

const iOSPermissions = [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    PERMISSIONS.IOS.MEDIA_LIBRARY,
];

const styles = StyleSheet.create({
    container: { marginTop: 20, flex: 1 },
    imageContainer: { flex: 1, alignItems: 'center' },
    textContainer: { flex: 1, marginLeft: 10 },
    wikipedia: {
        textDecorationLine: 'underline',
        color: 'lightblue',
        fontSize: 18,
    },
    image: {
        borderRadius: 100,
        height: 180,
        width: 180,
    },
    status: { fontSize: 18 },
    name: { fontSize: 24, color: 'black' },
    agency: { fontSize: 18, color: 'grey' },
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
                    showToast(TEXTS.allow_all_permissions);
                    navigation.navigate('CrewMembers');
                }
            },
        );
    }, []);

    const onOpenLink = () => {
        Linking.openURL(crewMember.wikipedia).catch(() => {
            showToast(TEXTS.could_not_open_link);
        });
    };

    const onCopyToClipboard = () => {
        Clipboard.setString(crewMember.wikipedia);
        showToast(TEXTS.copied_to_clipboard);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: crewMember.image }}
                    resizeMode="contain"
                    style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{crewMember.name}</Text>
                <Text style={styles.agency}>{crewMember.agency}</Text>
                <Text style={styles.wikipedia} onPress={onOpenLink} onLongPress={onCopyToClipboard}>
                    Wikipedia link
                </Text>
                <Text style={styles.status}>
                    Status: {capitalize(crewMember.status)}{' '}
                    <Icon
                        name={
                            crewMember.status === 'active'
                                ? 'checkmark-circle-sharp'
                                : 'close-circle-sharp'
                        }
                        color={crewMember.status === 'active' ? 'green' : 'red'}
                        size={20}
                    />
                </Text>
            </View>
        </View>
    );
};

export default CrewMemberPage;
