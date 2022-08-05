import React from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';

import Error from '@components/Error';
import Loading from '@components/Loading';
import { TEXTS } from '@constants/texts';
import { showToast } from '@helpers/toast';

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;
type RenderItem<T> = NonNullable<ArrElement<T>>;

type Props<T> = {
    renderItem: ListRenderItem<RenderItem<T>> | null | undefined;
    data: T;
    isLoading: boolean;
    isFetching: boolean;
    isPaused: boolean;
    isError: boolean;
    refetch: () => void;
};

function RocketsPage<T = any>({
    renderItem,
    data,
    isLoading,
    isFetching,
    isPaused,
    isError,
    refetch,
}: Props<T>) {
    if (isPaused && !data) {
        return <Error message={TEXTS.internet_connection_required} refetch={refetch} />;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isPaused) {
        showToast(TEXTS.could_not_fetch_data);
    }

    if (isError) {
        return <Error message={TEXTS.something_went_wrong} refetch={refetch} />;
    }

    return (
        <View>
            <FlatList
                data={data as any}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={renderItem}
            />
        </View>
    );
}

export default RocketsPage;
