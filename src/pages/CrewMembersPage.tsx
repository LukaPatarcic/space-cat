import React from 'react';
import { getCrewMembers } from '../api/spaceX';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CrewMemberStackParamList } from '../types/router';
import CrewMemberItem from '../components/CrewMemberItem';

type CrewMembersScreenRouteProp = NavigationProp<CrewMemberStackParamList, 'CrewMembers'>;

const CrewMembersPage = () => {
    const navigation = useNavigation<CrewMembersScreenRouteProp>();
    const { data, isLoading, isFetching, isError, refetch } = useQuery(
        ['crewMembers'],
        getCrewMembers,
    );
    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <View>
            <FlatList
                data={data}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({ item: crewMember }) => (
                    <CrewMemberItem
                        key={crewMember.id}
                        crewMember={crewMember}
                        onPress={() => navigation.navigate('CrewMember', { crewMember })}
                    />
                )}
            />
        </View>
    );
};

export default CrewMembersPage;
