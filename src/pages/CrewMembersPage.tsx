import React from 'react';
import { getCrewMembers } from '../api/spaceX';
import { useQuery } from '@tanstack/react-query';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CrewMemberStackParamList } from '../types/router';
import CrewMemberItem from '../components/CrewMemberItem';
import DataFetching from '../components/DataFetching';

type CrewMembersScreenRouteProp = NavigationProp<CrewMemberStackParamList, 'CrewMembers'>;

const CrewMembersPage = () => {
    const navigation = useNavigation<CrewMembersScreenRouteProp>();
    const { data, isLoading, isFetching, isError, isPaused, refetch } = useQuery(
        ['crewMembers'],
        getCrewMembers,
    );

    return (
        <DataFetching
            data={data}
            isLoading={isLoading}
            isError={isError}
            isPaused={isPaused}
            isFetching={isFetching}
            refetch={refetch}
            renderItem={({ item: crewMember }) => (
                <CrewMemberItem
                    key={crewMember.id}
                    crewMember={crewMember}
                    onPress={() => navigation.navigate('CrewMember', { crewMember })}
                />
            )}
        />
    );
};

export default CrewMembersPage;
