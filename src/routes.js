import { StackNavigator } from 'react-navigation';
import Events from './modules/events_selector/Events';

const AppNavigator = StackNavigator({
    Home: { screen: Events },
});

export default AppNavigator;