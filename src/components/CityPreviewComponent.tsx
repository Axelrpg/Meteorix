import React, { useEffect } from 'react';
import { Appearance, View } from 'react-native';
import { ActivityIndicator, Icon, Text, TouchableRipple } from 'react-native-paper';
import { CityInterface } from '../interface/CityInterface';
import axios from 'axios';
import { API_KEY } from '../../config';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import { styles } from '../styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigator';

// import { Container } from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type CityPreviewProps = {
    cityName: string;
};

export const CityPreviewComponent: React.FC<CityPreviewProps> = ({
    cityName,
}) => {

    const [loading, setLoading] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<CityInterface>();

    const colors = Appearance.getColorScheme();
    const data = searchResults?.forecast.forecastday[0].day;

    const navigation = useNavigation<NavigationProps>();

    const searchCity = async (city: string) => {
        try {
            setLoading(true);
            await axios.get<CityInterface>('http://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: API_KEY,
                    q: city,
                    days: 1,
                    aqi: 'yes',
                    alerts: 'no',
                },
            })
                .then((response) => {
                    setSearchResults(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        searchCity(cityName);
    }, []);

    return (
        <View>
            {
                loading ? (
                    <ActivityIndicator
                        animating={true}
                        size={30}
                        style={styles.cityPreviewActivityIndicator}
                        color={
                            colors === 'dark'
                                ? darkColors.primaryText.color
                                : lightColors.primaryText.color
                        }
                    />
                ) : (
                    <TouchableRipple
                        borderless={true}
                        rippleColor={
                            colors === 'dark'
                                ? 'rgba(255, 255, 255, .32)'
                                : 'rgba(0, 0, 0, .32)'
                        }
                        style={styles.cityPreviewTouchableRipple}
                        onPress={() => {
                            navigation.navigate('CityDetail', {
                                cityName: searchResults?.location.name!!,
                                cityCondition: searchResults?.forecast.forecastday[0].day.condition.text!!,
                            });
                        }}
                    >
                        <View style={styles.cityPreviewDataContainer}>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text
                                        style={styles.cityPreviewCityNameText}
                                        variant='bodyLarge'
                                    >
                                        {searchResults?.location.name}
                                    </Text>

                                    {/* <Icon
                                        size={20}
                                        source={'map-marker'}
                                        color={colors === 'dark'
                                            ? darkColors.primaryText.color
                                            : lightColors.primaryText.color
                                        }
                                    /> */}
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text
                                        style={{
                                            color: colors === 'dark'
                                                ? darkColors.secondaryText.color
                                                : lightColors.secondaryText.color,
                                        }}
                                        variant='bodyLarge'
                                    >
                                        AQI {Math.round(data?.air_quality.o3!!)}    {Math.round(data?.maxtemp_c!!)}° / {Math.round(data?.mintemp_c!!)}°
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={styles.cityPreviewCityTemperatureText}
                                    variant='headlineLarge'
                                >
                                    {Math.round(searchResults?.current.temp_c!!)}°
                                </Text>
                            </View>
                        </View>
                    </TouchableRipple>
                )
            }
        </View>
    );
}