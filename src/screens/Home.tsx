import React, { useEffect } from 'react';
import { Appearance, FlatList, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { styles } from '../styles/Styles';
import { darkColors } from '../colors/DarkColors';
import { lightColors } from '../colors/LightColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigator';
import { SearchCityInterface } from '../interface/SearchCityInterface';
import { CityPreviewComponent } from '../components/CityPreviewComponent';

// import { Container } from './styles';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home: React.FC = () => {

    const [cities, setCities] = React.useState<SearchCityInterface[]>([]);

    const colors = Appearance.getColorScheme();
    const currentStyle = colors === 'dark' ? darkColors : lightColors;

    const navigation = useNavigation<NavigationProps>();

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('cities');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData()
            .then((data) => {
                if (data !== null) {
                    setCities(data);
                }
            });
    }, []);

    return (
        <View style={styles.homeContainer}>
            <Appbar.Header
                dark={
                    colors === 'dark'
                        ? true
                        : false
                }
                mode='center-aligned'
                style={styles.appbarHeader}
            >
                <Appbar.Action
                    icon="plus"
                    onPress={() => navigation.navigate('AddCity')}
                />
                <Appbar.Content
                    title="Meteorix"
                />
                <Appbar.Action
                    icon="trash-can-outline"
                    onPress={() => {
                        AsyncStorage.removeItem('cities')
                            .then(() => {
                                setCities([]);
                            });
                    }}
                />
            </Appbar.Header>

            <View style={{
                flex: 1,
            }}>
                {
                    cities.length > 0
                        ? <FlatList
                            data={cities}
                            renderItem={({ item }) => (
                                <CityPreviewComponent cityName={item.name} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        : <View style={styles.homeCitiesContainer}>
                            <Text
                                style={styles.homeNoCitiesText}
                                variant='bodyLarge'
                            >
                                No cities added yet
                            </Text>
                        </View>
                }
            </View>
        </View>
    );
}