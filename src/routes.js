import { StackNavigator } from 'react-navigation';
import Events from './modules/events_selector/Events';
// import Polls from './modules/poll/Polls';
import Polls from './modules/poll/Polls';

const AppNavigator = StackNavigator({
    Home: { screen: Events },
    Polls: { screen: Polls },
});

export default AppNavigator;