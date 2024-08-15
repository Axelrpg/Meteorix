import { Appearance, StyleSheet } from "react-native";
import { darkColors } from "../colors/DarkColors";
import { lightColors } from "../colors/LightColors";

const currentStyle = Appearance.getColorScheme()

export const styles = StyleSheet.create({
    addCityActivityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCityContainer: {
        flex: 1,
        padding: 10,
    },
    addCityItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: currentStyle === 'dark'
            ? darkColors.primaryBackground.color
            : lightColors.primaryBackground.color,
        borderRadius: 10,
        justifyContent: 'space-between',
        padding: 10,
    },
    addCityItemPrimaryText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        fontWeight: 'bold',
    },
    addCityItemSecondaryText: {
        color: currentStyle === 'dark'
            ? darkColors.secondaryText.color
            : lightColors.secondaryText.color,
    },
    addCitySearchbar: {
        backgroundColor: currentStyle === 'dark'
            ? darkColors.secondaryBackground.color
            : lightColors.secondaryBackground.color,
        marginHorizontal: 10,
    },
    addCityTouchableRipple: {
        borderRadius: 10,
        marginVertical: 5,
    },
    appbarHeader: {
        backgroundColor: 'transparent',
    },
    cityDetailAirQualityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 20,
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 2.5,
    },
    cityDetailCentigradeText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 35,
    },
    cityDetailConditionText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        marginLeft: 5,
    },
    cityDetailFutureForecastContainer: {
        flex: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    cityDetailFutureForecastHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cityDetailFutureForecastItemContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 20,
        padding: 20,
    },
    cityDetailTemperatureContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cityDetailTemperatureText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        fontSize: 125,
        fontWeight: 'bold',
    },
    cityPreviewActivityIndicator: {
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
    },
    cityPreviewDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cityPreviewCityInfoText: {
        color: currentStyle === 'dark'
            ? darkColors.secondaryText.color
            : lightColors.secondaryText.color,
    },
    cityPreviewCityNameText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        fontWeight: 'bold',
        marginRight: 2.5,
    },
    cityPreviewCityTemperatureText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        fontWeight: 'bold',
    },
    cityPreviewTouchableRipple: {
        backgroundColor: currentStyle === 'dark'
            ? darkColors.secondaryBackground.color
            : lightColors.secondaryBackground.color,
        borderRadius: 20,
        height: 100,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cityTemperaturesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    cityTemperaturesDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cityTemperaturesDateText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
        marginLeft: 5,
    },
    cityTemperaturesMaxMinText: {
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
    },
    homeCitiesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeContainer: {
        flex: 1,
        backgroundColor: currentStyle === 'dark'
            ? darkColors.primaryBackground.color
            : lightColors.primaryBackground.color,
    },
    homeNoCitiesText: {
        textAlign: 'center',
        color: currentStyle === 'dark'
            ? darkColors.primaryText.color
            : lightColors.primaryText.color,
    },
});