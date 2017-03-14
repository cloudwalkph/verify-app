import { StackNavigator } from 'react-navigation';
import Home from './modules/home/Home';
import Events from './modules/events_selector/Events';

const AppNavigator = StackNavigator({
    Home: { screen: Home },
    EventSelector: { screen: Events },
});

export default AppNavigator;