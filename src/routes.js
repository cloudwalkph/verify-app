import { StackNavigator } from 'react-navigation';
import Events from './modules/events_selector/Events';
// import Polls from './modules/poll/Polls';
import Polls from './modules/poll/Polls';
import Camera from './modules/camera/Camera';

const AppNavigator = StackNavigator({
    Home: { screen: Events },
    Polls: { screen: Polls },
    Camera: { screen: Camera }
});

export default AppNavigator;