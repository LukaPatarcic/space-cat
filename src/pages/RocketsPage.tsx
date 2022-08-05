import React from 'react';

import { getRockets } from '@api/spaceX';
import DataFetching from '@components/DataFetching';
import RocketItem from '@components/RocketItem';
import { useQuery } from '@tanstack/react-query';

const RocketsPage = () => {
    const { data, isLoading, isFetching, isPaused, isError, refetch } = useQuery(
        ['rockets'],
        getRockets,
    );

    return (
        <DataFetching
            isFetching={isFetching}
            isError={isError}
            isPaused={isPaused}
            isLoading={isLoading}
            data={data}
            refetch={refetch}
            renderItem={({ item: rocket }) => <RocketItem key={rocket.id} rocket={rocket} />}
        />
    );
};

export default RocketsPage;
