import * as React from 'react';
import { useEffect } from 'react';

import { PRIMARY_COLOR } from '@constants/colors';
import { TEXTS } from '@constants/texts';
import { showToast } from '@helpers/toast';
import CrewMemberPage from '@pages/CrewMemberPage';
import CrewMembersPage from '@pages/CrewMembersPage';
import RocketsPage from '@pages/RocketsPage';
import NetInfo from '@react-native-community/netinfo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { onlineManager } from '@tanstack/react-query';
import { CrewMemberStackParamList, TabParamList } from '@type/router';
import Icon from 'react-native-vector-icons/Ionicons';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator<TabParamList>();
const CrewMembersStack = createNativeStackNavigator<CrewMemberStackParamList>();

// eslint-disable-next-line no-unused-vars
const icons: { [key in keyof TabParamList]: string } = {
    Rockets: 'rocket',
    RootCrewMembers: 'md-people',
};

function CrewMembersStackPage() {
    return (
        <CrewMembersStack.Navigator>
            <CrewMembersStack.Screen
                name="CrewMembers"
                options={{ title: 'Crew Members', headerTintColor: PRIMARY_COLOR }}
                component={CrewMembersPage}
            />
            <CrewMembersStack.Screen
                name="CrewMember"
                options={({ route }) => ({
                    title: route.params.crewMember.name,
                    headerTintColor: PRIMARY_COLOR,
                })}
                component={CrewMemberPage}
            />
        </CrewMembersStack.Navigator>
    );
}

const App = () => {
    useEffect(() => {
        onlineManager.setEventListener((setOnline) => {
            return NetInfo.addEventListener((state) => {
                if (!state.isConnected) {
                    showToast(TEXTS.no_internet_connection);
                }
                setOnline(!!state.isConnected);
            });
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarActiveTintColor: PRIMARY_COLOR,
                        tabBarInactiveTintColor: 'rgba(0,0,0,0.5)',
                        tabBarIcon: ({ focused, color, size }) => {
                            const iconName = `${icons[`${route.name}`]}${
                                focused ? '' : '-outline'
                            }`;
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen
                        name="Rockets"
                        component={RocketsPage}
                        options={{ headerTintColor: PRIMARY_COLOR }}
                    />
                    <Tab.Screen
                        name="RootCrewMembers"
                        options={{
                            headerShown: false,
                            title: 'Crew Members',
                        }}
                        component={CrewMembersStackPage}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
};

export default App;
