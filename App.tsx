import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RocketsPage from './src/pages/RocketsPage';
import CrewMembersPage from './src/pages/CrewMembersPage';
import CrewMemberPage from './src/pages/CrewMemberPage';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { showToast } from './src/helpers/toast';
import { CrewMemberStackParamList, TabParamList } from './src/types/router';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_COLOR } from './src/constants/colors';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator<TabParamList>();
const CrewMembersStack = createNativeStackNavigator<CrewMemberStackParamList>();

// eslint-disable-next-line no-unused-vars
const icons: { [key in keyof TabParamList]: string } = {
    Rockets: 'rocket',
    RootCrewMembers: 'md-people-sharp',
};

function CrewMembersStackPage() {
    return (
        <CrewMembersStack.Navigator>
            <CrewMembersStack.Screen
                name="CrewMembers"
                options={{ title: 'Crew Members' }}
                component={CrewMembersPage}
            />
            <CrewMembersStack.Screen
                name="CrewMember"
                options={({ route }) => ({ title: route.params.crewMember.name })}
                component={CrewMemberPage}
            />
        </CrewMembersStack.Navigator>
    );
}

const App = () => {
    useEffect(() => {
        onlineManager.setEventListener((setOnline) => {
            return NetInfo.addEventListener((state) => {
                console.log(state);
                showToast(state.isConnected ? 'Online' : 'Offline');
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
                            const iconName = icons[`${route.name}`] + focused ? '-outline' : '';
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen name="Rockets" component={RocketsPage} />
                    <Tab.Screen
                        name="RootCrewMembers"
                        options={{ headerShown: false, title: 'Crew Members' }}
                        component={CrewMembersStackPage}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
};

export default App;
