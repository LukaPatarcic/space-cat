import React from 'react';
import { getRockets } from '../api/spaceX';
import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
import Error from '../components/Error';
import RocketItem from '../components/RocketItem';

const RocketsPage = () => {
    const { data, isLoading, isFetching, isError, refetch } = useQuery(['rockets'], getRockets);
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
                renderItem={({ item: rocket }) => <RocketItem key={rocket.id} rocket={rocket} />}
            />
        </View>
    );
};

export default RocketsPage;
