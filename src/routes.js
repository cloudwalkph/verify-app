import { StackNavigator } from 'react-navigation';

const AppNavigator = StackNavigator({
    Home: { screen: MyTabNavigator },
});

export default AppNavigator;