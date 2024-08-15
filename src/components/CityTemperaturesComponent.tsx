import React from 'react';
import { Appearance, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import { Day, Forecastday } from '../interface/CityInterface';
import { styles } from '../styles/Styles';

// import { Container } from './styles';

type CityTemperaturesInterface = {
    forecastDay: Forecastday;
};

export const CityTemperaturesComponent: React.FC<CityTemperaturesInterface> = ({
    forecastDay,
}) => {

    const colors = Appearance.getColorScheme();

    const day: Day = forecastDay.day;

    return (
        <View style={styles.cityTemperaturesContainer}>
            <View style={styles.cityTemperaturesDateContainer}>
                <Icon
                    size={20}
                    source={'thermometer'}
                    color={
                        colors === 'dark'
                            ? darkColors.primaryText.color
                            : lightColors.primaryText.color
                    }
                />

                <Text style={styles.cityTemperaturesDateText}>
                    {forecastDay.date.substring(5)}   {day?.condition.text}
                </Text>
            </View>
            <View>
                <Text style={styles.cityTemperaturesMaxMinText}>
                    {Math.round(day?.maxtemp_c!!)}° / {Math.round(day?.mintemp_c!!)}°
                </Text>
            </View>
        </View>
    );
}