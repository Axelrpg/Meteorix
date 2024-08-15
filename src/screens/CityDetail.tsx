import React, { useEffect } from 'react';
import { Appearance, FlatList, StyleSheet, View } from 'react-native';
import { styles } from '../styles/Styles';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigator';
import { ActivityIndicator, Appbar, Icon, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CityInterface } from '../interface/CityInterface';
import axios from 'axios';
import { API_KEY } from '../../config';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import { CityTemperaturesComponent } from '../components/CityTemperaturesComponent';
import Video from 'react-native-video';
import { setVideoBackground } from '../helpers/SetVideoBackground';

// import { Container } from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'CityDetail'>;

type CityDetailRouteProps = RouteProp<RootStackParamList, 'CityDetail'>;

type CityDetailProps = {
    route: CityDetailRouteProps;
};

export const CityDetail: React.FC<CityDetailProps> = () => {

    const { params } = useRoute<CityDetailRouteProps>();
    const {
        cityCondition,
        cityName
    } = params;

    const [loading, setLoading] = React.useState(true);
    const [searchResults, setSearchResults] = React.useState<CityInterface>();
    const [videoUrl, setVideoUrl] = React.useState<string>('');

    const colors = Appearance.getColorScheme();
    const data = searchResults?.forecast.forecastday[0].day;
    const forecastDays = searchResults?.forecast.forecastday;

    const navigation = useNavigation<NavigationProps>();

    const searchCity = async (city: string) => {
        try {
            setLoading(true);
            await axios.get<CityInterface>('http://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: API_KEY,
                    q: city,
                    days: 10,
                    aqi: 'yes',
                    alerts: 'no',
                },
            })
                .then((response) => {
                    setSearchResults(response.data);
                    console.log(cityCondition);
                    setVideoUrl(setVideoBackground(cityCondition));
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
        <View style={styles.homeContainer}>
            {
                loading ? (
                    <ActivityIndicator
                        color={colors === 'dark'
                            ? darkColors.primaryText.color
                            : lightColors.primaryText.color
                        }
                        size='large'
                        style={styles.addCityActivityIndicatorContainer}
                    />
                ) : (
                    <View style={{
                        flex: 1,
                    }}>
                        <Video
                            source={{
                                uri: videoUrl,
                            }}
                            style={StyleSheet.absoluteFillObject}
                            muted
                            repeat
                            resizeMode='cover'
                        />

                        <Appbar.Header
                            dark={
                                colors === 'dark'
                                    ? true
                                    : false
                            }
                            mode='center-aligned'
                            style={styles.appbarHeader}
                        >
                            <Appbar.BackAction
                                onPress={() => navigation.goBack()}
                            />
                            <Appbar.Content
                                title={cityName}
                            />
                        </Appbar.Header>

                        <View style={styles.cityDetailTemperatureContainer}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text
                                    style={styles.cityDetailTemperatureText}
                                >
                                    {Math.round(searchResults?.current.temp_c!!)}
                                </Text>
                                <Text
                                    style={styles.cityDetailCentigradeText}
                                    variant='headlineLarge'
                                >
                                    °C
                                </Text>
                            </View>
                            <Text
                                style={styles.cityDetailConditionText}
                                variant='bodyLarge'
                            >
                                {data?.condition.text}
                            </Text>
                            <Text
                                style={styles.cityDetailConditionText}
                                variant='bodyLarge'
                            >
                                {Math.round(data?.maxtemp_c!!)}° / {Math.round(data?.mintemp_c!!)}°
                            </Text>

                            <View style={styles.cityDetailAirQualityContainer}>
                                <Icon
                                    color={
                                        colors === 'dark'
                                            ? darkColors.primaryText.color
                                            : lightColors.primaryText.color
                                    }
                                    size={20}
                                    source={'leaf'}
                                />
                                <Text
                                    style={styles.cityDetailConditionText}
                                    variant='bodyLarge'
                                >
                                    AQI {Math.round(data?.air_quality.o3!!)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.cityDetailFutureForecastContainer}>
                            <View style={styles.cityDetailFutureForecastItemContainer}>
                                <View style={styles.cityDetailFutureForecastHeader}>
                                    <Icon
                                        size={20}
                                        source={'calendar-month-outline'}
                                        color={
                                            colors === 'dark'
                                                ? darkColors.secondaryText.color
                                                : lightColors.secondaryText.color
                                        }
                                    />
                                    <Text style={{
                                        color: colors === 'dark'
                                            ? darkColors.secondaryText.color
                                            : lightColors.secondaryText.color,
                                        marginLeft: 10,
                                    }}>
                                        5-day forecast
                                    </Text>
                                </View>

                                {
                                    <FlatList
                                        data={forecastDays}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <CityTemperaturesComponent
                                                forecastDay={item}
                                            />
                                        )}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                )
            }

        </View>
    );
}