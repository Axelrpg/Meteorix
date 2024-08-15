import React from 'react';
import { Appearance, FlatList, View } from 'react-native';
import { styles } from '../styles/Styles';
import { ActivityIndicator, Appbar, Icon, Searchbar, Text, TouchableRipple } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigator';
import { useNavigation } from '@react-navigation/native';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import axios from 'axios';
import { SearchCityInterface } from '../interface/SearchCityInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '../../config';

// import { Container } from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'AddCity'>;

export const AddCity: React.FC = () => {

    const [loading, setLoading] = React.useState(false);
    const [searchBar, setSearchBar] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<SearchCityInterface[]>([]);

    const colors = Appearance.getColorScheme();

    const navigation = useNavigation<NavigationProps>();

    const addCity = async(city: SearchCityInterface) => {
        try {
            const getJson = await AsyncStorage.getItem('cities');
            let cities = getJson ? JSON.parse(getJson) : [];
            cities.push(city);
            await AsyncStorage.setItem('cities', JSON.stringify(cities));
            navigation.replace('Home');
        }
        catch (error) {
            console.error(error);
        }
    };

    const searchCity = async (city: string) => {
        try {

            setLoading(true);

            await axios.get<SearchCityInterface[]>('http://api.weatherapi.com/v1/search.json', {
                params: {
                    key: API_KEY,
                    q: city,
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

    return (
        <View style={styles.homeContainer}>
            <Appbar.Header
                dark={
                    colors === 'dark'
                        ? true
                        : false
                }
                mode='medium'
                style={styles.appbarHeader}
            >
                <Appbar.BackAction
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title="Manage Cities"
                />
            </Appbar.Header>

            <View style={styles.addCityContainer}>
                <Searchbar
                    cursorColor={
                        colors === 'dark'
                            ? darkColors.secondaryText.color
                            : lightColors.secondaryText.color
                    }
                    iconColor={
                        colors === 'dark'
                            ? darkColors.secondaryText.color
                            : lightColors.secondaryText.color
                    }
                    inputStyle={{
                        color: colors === 'dark'
                            ? darkColors.primaryText.color
                            : lightColors.primaryText.color
                    }}
                    placeholder='Enter location'
                    placeholderTextColor={
                        colors === 'dark'
                            ? darkColors.secondaryText.color
                            : lightColors.secondaryText.color
                    }
                    rippleColor={
                        colors === 'dark'
                            ? darkColors.secondaryText.color
                            : lightColors.secondaryText.color
                    }
                    selectionColor={
                        colors === 'dark'
                            ? darkColors.secondaryText.color
                            : lightColors.secondaryText.color
                    }
                    style={styles.addCitySearchbar}
                    value={searchBar}
                    onChangeText={(text) => {
                        setSearchBar(text);
                        if (text.length > 2) {
                            searchCity(text);
                        }
                    }}
                    onClearIconPress={() => {
                        setSearchBar('');
                        setSearchResults([]);
                    }}
                />

                {
                    loading
                        ? <View style={styles.addCityActivityIndicatorContainer}>
                            <ActivityIndicator
                                animating={true}
                                color={
                                    colors === 'dark'
                                        ? darkColors.primaryText.color
                                        : lightColors.primaryText.color
                                }
                                size='large'
                            />
                        </View>
                        : <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.id.toString()}
                            style={{
                                padding: 10,
                            }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableRipple
                                        borderless={true}
                                        rippleColor={
                                            colors === 'dark'
                                                ? darkColors.primaryText.color
                                                : lightColors.primaryText.color
                                        }
                                        style={styles.addCityTouchableRipple}
                                        onPress={() => addCity(item)}
                                    >
                                        <View style={styles.addCityItemContainer}>
                                            <View>
                                                <Text
                                                    style={styles.addCityItemPrimaryText}
                                                    variant='bodyLarge'
                                                >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={styles.addCityItemSecondaryText}
                                                    variant='bodyMedium'
                                                >
                                                    {item.region}, {item.country}
                                                </Text>
                                            </View>
                                            <Icon
                                                color={
                                                    colors === 'dark'
                                                        ? darkColors.primaryText.color
                                                        : lightColors.primaryText.color
                                                }
                                                size={30}
                                                source={'plus'}
                                            />
                                        </View>
                                    </TouchableRipple>
                                );
                            }}
                        />
                }
            </View>
        </View>
    );
}