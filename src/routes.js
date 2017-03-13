import { StackNavigator } from 'react-navigation';
import Home from './modules/home/Home';

const AppNavigator = StackNavigator({
    Home: { screen: Home },
});

export default AppNavigator;