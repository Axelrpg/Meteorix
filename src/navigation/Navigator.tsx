import React, { useEffect } from 'react';
import { Home } from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appearance, StatusBar } from 'react-native';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import { AddCity } from '../screens/AddCity';
import { CityDetail } from '../screens/CityDetail';

// import { Container } from './styles';

export type RootStackParamList = {
    Home: undefined;
    AddCity: undefined;
    CityDetail: {
        cityName: string;
        cityCondition: string;
    };
};

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

export const Navigator: React.FC = () => {

    const colors = Appearance.getColorScheme();

    useEffect(() => {
        StatusBar.setBarStyle(colors === 'dark' ? 'light-content' : 'dark-content');
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
    }, []);

    return (
        <StackNavigator.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={Home}
            />
            <StackNavigator.Screen
                name="AddCity"
                component={AddCity}
            />
            <StackNavigator.Screen
                name="CityDetail"
                component={CityDetail}
            />
        </StackNavigator.Navigator>
    );
}